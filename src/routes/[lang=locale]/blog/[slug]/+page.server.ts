import { getArticleBySlug, getNextArticle } from '$lib/server/db/article';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { session } = await locals.safeGetSession();
	const result = await getArticleBySlug(params.lang, params.slug);
	if (!result) throw error(404, 'Article not found');

	const nextArticle = await getNextArticle(params.lang, params.slug);
	const articles = nextArticle ? [nextArticle] : [];

	return { article: result.article, articles, session, lang: params.lang };
};
