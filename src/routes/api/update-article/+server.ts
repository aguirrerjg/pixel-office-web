import { json } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { updateArticle } from '$lib/server/db/article';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAuth(request, locals);

	const { articleId, title, content, teaser, thumbnail, thumbnailId, languageCode } = await request.json();
	await updateArticle({ articleId: Number(articleId), title, content, teaser, thumbnail, thumbnailId, languageCode });
	return json({ articleId, status: 'ok' });
};
