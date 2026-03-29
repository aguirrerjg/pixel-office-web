import { json, error } from '@sveltejs/kit';
import { storeAsset } from '$lib/server/storage';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	const data = await request.formData();
	const path = data.get('path') as string;
	const file = data.get('file') as File;

	const buffer = Buffer.from(await file.arrayBuffer());
	const { url, fileId } = await storeAsset(path, buffer, file.type || 'image/png');

	return json({ path, url, fileId });
};
