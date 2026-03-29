import { json } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { createArticle } from '$lib/server/db/article';
import { storeAsset } from '$lib/server/storage';
import { nanoid } from '$lib/util';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAuth(request, locals);

	const { title, content, teaser, thumbnail, thumbnailId, thumbnailBase64, languageCode } = await request.json();

	let finalThumbnail = thumbnail;
	let finalThumbnailId = thumbnailId;

	// If agent sends base64 image, upload it automatically
	if (thumbnailBase64 && !thumbnail) {
		const match = thumbnailBase64.match(/^data:image\/(\w+);base64,(.+)$/);
		const raw = match ? match[2] : thumbnailBase64;
		const ext = match ? match[1] : 'png';
		const contentType = match ? `image/${ext}` : 'image/png';

		const buffer = Buffer.from(raw, 'base64');
		const path = `thumbnail__${nanoid(12)}.${ext}`;
		const { url, fileId } = await storeAsset(path, buffer, contentType);
		finalThumbnail = url;
		finalThumbnailId = fileId;
	}

	const slug = await createArticle({
		title,
		content,
		teaser,
		thumbnail: finalThumbnail,
		thumbnailId: finalThumbnailId,
		languageCode
	});

	return json({ slug, thumbnail: finalThumbnail });
};
