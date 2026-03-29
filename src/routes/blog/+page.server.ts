import { getArticles } from '$lib/server/db/article';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession();
	const articles = await getArticles(session);
	return { articles };
};
