import { json } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { createArticle } from '$lib/server/db/article';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAuth(request, locals);

	const { title, content, teaser, thumbnail, thumbnailId, languageCode } = await request.json();
	const slug = await createArticle({ title, content, teaser, thumbnail, thumbnailId, languageCode });
	return json({ slug });
};
