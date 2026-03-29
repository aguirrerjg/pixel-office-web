import { json } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { deleteArticle } from '$lib/server/db/article';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAuth(request, locals);

	const { articleId } = await request.json();
	await deleteArticle(Number(articleId));
	return json({ status: 'ok' });
};
