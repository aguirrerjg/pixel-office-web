import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const BUCKET = 'blog-assets';

// Service-role client for server-side storage operations
const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function storeAsset(
	path: string,
	file: Buffer | Uint8Array,
	contentType = 'image/png'
): Promise<{ url: string; fileId: string }> {
	const { error } = await supabase.storage
		.from(BUCKET)
		.upload(path, file, { contentType, upsert: true });

	if (error) throw new Error(`Storage upload failed: ${error.message}`);

	const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

	return { url: data.publicUrl, fileId: path };
}

export async function deleteAsset(fileId: string): Promise<void> {
	try {
		await supabase.storage.from(BUCKET).remove([fileId]);
	} catch (e) {
		console.error('Storage delete failed:', e);
	}
}
