import { getArticles } from '$lib/server/db/article';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { session } = await locals.safeGetSession();
	const articles = await getArticles(params.lang, session);
	return { articles, session, lang: params.lang };
};
