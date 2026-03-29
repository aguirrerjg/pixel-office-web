import { json, error } from '@sveltejs/kit';
import { deleteArticle } from '$lib/server/db/article';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	const { articleId } = await request.json();
	await deleteArticle(Number(articleId));
	return json({ status: 'ok' });
};
