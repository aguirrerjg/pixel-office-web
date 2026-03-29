import { json, error } from '@sveltejs/kit';
import { createArticle } from '$lib/server/db/article';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	const { title, content, teaser, thumbnail, thumbnailId } = await request.json();
	const slug = await createArticle({ title, content, teaser, thumbnail, thumbnailId });
	return json({ slug });
};
