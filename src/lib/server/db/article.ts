import { nanoid } from '$lib/util';
import slugify from 'slugify';
import { deleteAsset } from '$lib/server/storage';
import { db } from '.';
import { articleTranslations, articles } from './schema';
import { desc, eq, lt, ne, sql, getTableColumns, and } from 'drizzle-orm';
import type { Article, ArticleTranslation } from './types';

const articleFields = {
	...getTableColumns(articleTranslations),
	...getTableColumns(articles)
};

/**
 * Creates a new article and its translation. Returns the slug.
 */
export async function createArticle(data: {
	title: string;
	content: string;
	teaser: string;
	thumbnail?: string;
	thumbnailId?: string;
	languageCode?: string;
}): Promise<string> {
	const languageCode = data.languageCode ?? 'es';
	let slug = slugify(data.title, { lower: true, strict: true });

	// If slug is already used, add a unique postfix
	const existing = await db.select().from(articles).where(eq(articles.slug, slug));
	if (existing?.length > 0) {
		slug = slug + '-' + nanoid(8);
	}

	const newArticle = await db
		.insert(articles)
		.values({
			slug,
			published_at: new Date(),
			thumbnail: data.thumbnail ?? null,
			thumbnail_id: data.thumbnailId ?? null
		})
		.returning({
			slug: articles.slug,
			created_at: articles.created_at,
			article_id: articles.article_id
		});

	await db.insert(articleTranslations).values({
		slug,
		article_id: newArticle[0].article_id,
		title: data.title,
		teaser: data.teaser,
		content: data.content,
		language_code: languageCode
	});

	return newArticle[0].slug;
}

/**
 * Returns articles ordered by published_at descending.
 * When session is present, include drafts (published_at IS NULL).
 */
export async function getArticles(
	languageCode: string,
	session: any,
	limit?: number
): Promise<(Article & ArticleTranslation)[]> {
	if (session) {
		let query = db
			.select({
				...articleFields,
				slug: articleTranslations.slug,
				modified_at: sql<Date | null>`coalesce(articles.created_at, articles.published_at, articles.updated_at)`
			})
			.from(articles)
			.orderBy(desc(articles.published_at))
			.innerJoin(
				articleTranslations,
				and(
					eq(articles.article_id, articleTranslations.article_id),
					eq(articleTranslations.language_code, languageCode)
				)
			);

		if (limit) {
			query = query.limit(limit);
		}

		return (await query) as any;
	}

	let query = db
		.select({ ...articleFields, slug: articleTranslations.slug })
		.from(articles)
		.orderBy(desc(articles.published_at))
		.innerJoin(
			articleTranslations,
			and(
				eq(articles.article_id, articleTranslations.article_id),
				eq(articleTranslations.language_code, languageCode)
			)
		);

	if (limit) {
		query = query.limit(limit);
	}

	let results = await query;
	results = results.filter((d) => d.published_at !== null) ?? [];

	return results as any;
}

/**
 * Retrieve article by slug.
 */
export async function getArticleBySlug(
	languageCode: string,
	slug: string
): Promise<{ article: Article & ArticleTranslation } | null> {
	const result = await db.transaction(async (tx) => {
		// Try finding translation by slug first
		let translation = (
			await tx
				.select({
					translation_id: articleTranslations.translation_id,
					slug: articleTranslations.slug,
					article_id: articleTranslations.article_id
				})
				.from(articleTranslations)
				.where(eq(articleTranslations.slug, slug))
				.limit(1)
		)?.[0];

		// Fallback: look up by article slug
		if (!translation) {
			translation = (
				await tx
					.select({
						translation_id: articleTranslations.translation_id,
						slug: articleTranslations.slug,
						article_id: articleTranslations.article_id
					})
					.from(articles)
					.innerJoin(articleTranslations, eq(articleTranslations.article_id, articles.article_id))
					.where(
						and(
							eq(articles.slug, slug),
							eq(articleTranslations.language_code, languageCode)
						)
					)
					.limit(1)
			)?.[0];
		}

		if (!translation?.translation_id) return null;

		const article = await tx
			.select(articleFields)
			.from(articles)
			.leftJoin(
				articleTranslations,
				eq(articleTranslations.translation_id, translation.translation_id)
			)
			.where(eq(articles.article_id, articleTranslations.article_id))
			.limit(1);

		if (!article?.[0]) return null;

		return {
			article: {
				...article[0],
				translation_id: article[0].translation_id as number
			}
		};
	});

	return result as any;
}

/**
 * Given a slug, determine the next article to read.
 * Uses a CTE to find the article published just before the current one,
 * falling back to the latest article (excluding current).
 */
export async function getNextArticle(
	languageCode: string,
	slug: string
): Promise<(Article & ArticleTranslation) | null> {
	const nextSlug = await db.transaction(async (trx) => {
		// Current article's published_at
		const ca = trx
			.$with('ca')
			.as(
				trx
					.select({ published_at: articleTranslations.published_at })
					.from(articleTranslations)
					.where(eq(articleTranslations.slug, slug))
			);

		// Previous: published just before current article
		const pa = trx
			.with(ca)
			.select({ slug: articleTranslations.slug, published_at: articleTranslations.published_at })
			.from(ca)
			.innerJoin(
				articleTranslations,
				and(
					lt(articleTranslations.published_at, ca.published_at),
					eq(articleTranslations.language_code, languageCode)
				)
			)
			.orderBy(desc(articleTranslations.published_at))
			.limit(1);

		// Latest article excluding current
		const la = trx
			.select({ slug: articleTranslations.slug, published_at: articleTranslations.published_at })
			.from(articleTranslations)
			.where(
				and(
					ne(articleTranslations.slug, slug),
					eq(articleTranslations.language_code, languageCode)
				)
			)
			.orderBy(desc(articleTranslations.published_at))
			.limit(1);

		const laRes = (await la)?.[0];
		const paRes = (await pa)?.[0];

		let next: typeof laRes;
		if (laRes?.published_at && paRes?.published_at) {
			next = paRes.published_at < laRes.published_at ? paRes : laRes;
		} else {
			next = laRes;
		}

		return next;
	});

	if (!nextSlug?.slug) return null;

	const result = await getArticleBySlug(languageCode, nextSlug.slug);
	return result ? (result.article as any) : null;
}

/**
 * Update an existing article and its translation.
 */
export async function updateArticle(data: {
	articleId: number;
	title: string;
	content: string;
	teaser: string;
	thumbnail?: string;
	thumbnailId?: string;
	languageCode?: string;
}): Promise<void> {
	const languageCode = data.languageCode ?? 'es';
	const updatedAt = new Date();

	let slug = slugify(data.title, { lower: true, strict: true });

	// If slug is already used by a different translation, add a unique postfix
	const existing = await db
		.select({ id: articleTranslations.translation_id })
		.from(articleTranslations)
		.where(eq(articleTranslations.slug, slug));

	if (existing?.length > 0) {
		slug = slug + '-' + nanoid(8);
	}

	const values = {
		slug,
		title: data.title,
		content: data.content,
		teaser: data.teaser,
		updated_at: updatedAt,
		article_id: data.articleId,
		language_code: languageCode,
		created_at: updatedAt,
		published_at: updatedAt
	};

	await db.transaction(async (tx) => {
		const existingTranslation = await tx
			.select()
			.from(articleTranslations)
			.where(
				and(
					eq(articleTranslations.article_id, data.articleId),
					eq(articleTranslations.language_code, languageCode)
				)
			);
		const existingTranslationId = existingTranslation?.[0]?.translation_id;

		if (existingTranslationId) {
			await tx
				.update(articleTranslations)
				.set(values)
				.where(eq(articleTranslations.translation_id, existingTranslationId));
		} else {
			await tx.insert(articleTranslations).values(values);
		}

		await tx
			.update(articles)
			.set({
				thumbnail: data.thumbnail ?? undefined,
				thumbnail_id: data.thumbnailId ?? undefined,
				updated_at: updatedAt
			})
			.where(eq(articles.article_id, data.articleId));
	});
}

/**
 * Delete article and its translations. Also deletes the thumbnail asset if present.
 */
export async function deleteArticle(articleId: number): Promise<void> {
	const thumbnailResult = await db
		.select({ thumbnail_id: articles.thumbnail_id })
		.from(articles)
		.where(eq(articles.article_id, articleId))
		.limit(1);

	const thumbnailId = thumbnailResult?.[0]?.thumbnail_id;

	await db.transaction(async (tx) => {
		await tx.delete(articleTranslations).where(eq(articleTranslations.article_id, articleId));
		await tx.delete(articles).where(eq(articles.article_id, articleId));
	});

	if (thumbnailId) await deleteAsset(thumbnailId);
}

/**
 * Returns all article slugs for sitemap generation.
 */
export async function getArticlesForSitemap(): Promise<{ slug: string }[]> {
	return db
		.select({ slug: articles.slug })
		.from(articles);
}
