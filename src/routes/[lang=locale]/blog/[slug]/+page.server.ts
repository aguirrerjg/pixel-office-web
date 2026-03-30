import { getArticleBySlug, getNextArticle } from '$lib/server/db/article';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { session } = await locals.safeGetSession();
	const result = await getArticleBySlug(params.lang, params.slug);
	if (!result) throw error(404, 'Article not found');

	// If the slug belongs to a different language, redirect to the correct slug
	const correctSlug = result.availables?.[params.lang];
	if (correctSlug && correctSlug !== params.slug) {
		throw redirect(301, `/${params.lang}/blog/${correctSlug}`);
	}

	const nextArticle = await getNextArticle(params.lang, params.slug);
	const articles = nextArticle ? [nextArticle] : [];

	return { article: result.article, articles, session, lang: params.lang, availables: result.availables };
};
