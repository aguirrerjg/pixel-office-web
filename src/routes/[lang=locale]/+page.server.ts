import { getArticles } from '$lib/server/db/article';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const articles = await getArticles('en', null, 3);
	const articlesEs = await getArticles('es', null, 3);
	return { articles, articlesEs };
};
