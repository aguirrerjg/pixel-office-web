import ImageKit from 'imagekit';
import { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY } from '$env/static/private';
import { PUBLIC_IMAGEKIT_URL_ENDPOINT } from '$env/static/public';

const imagekit = new ImageKit({
	publicKey: IMAGEKIT_PUBLIC_KEY,
	privateKey: IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT
});

export async function storeAsset(
	assetId: string,
	file: Buffer | string
): Promise<{ url: string; fileId: string }> {
	const result = await imagekit.upload({
		file,
		fileName: assetId,
		folder: '/agentsquad-blog/images'
	});
	return { url: result.url, fileId: result.fileId };
}

export async function deleteAsset(fileId: string): Promise<void> {
	try {
		await imagekit.deleteFile(fileId);
	} catch (e) {
		console.error('ImageKit delete failed:', e);
	}
}
