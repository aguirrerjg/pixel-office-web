import { json, error } from '@sveltejs/kit';
import { updateArticle } from '$lib/server/db/article';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	const { articleId, title, content, teaser, thumbnail, thumbnailId } = await request.json();
	await updateArticle({ articleId: Number(articleId), title, content, teaser, thumbnail, thumbnailId });
	return json({ articleId, status: 'ok' });
};
