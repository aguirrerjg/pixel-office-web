import { json } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { storeAsset } from '$lib/server/storage';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, locals }) => {
	await requireAuth(request, locals);

	const data = await request.formData();
	const path = data.get('path') as string;
	const file = data.get('file') as File;

	const buffer = Buffer.from(await file.arrayBuffer());
	const { url, fileId } = await storeAsset(path, buffer, file.type || 'image/png');

	return json({ path, url, fileId });
};
