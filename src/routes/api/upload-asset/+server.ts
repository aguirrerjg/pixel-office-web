import { json, error } from '@sveltejs/kit';
import { storeAsset } from '$lib/server/imagekit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	const data = await request.formData();
	const assetId = data.get('path') as string;
	const file = data.get('file') as File;

	const buffer = Buffer.from(await file.arrayBuffer());
	const { url, fileId } = await storeAsset(assetId, buffer);

	return json({ path: assetId, url, fileId });
};
