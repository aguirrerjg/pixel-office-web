import type { Schema } from 'prosemirror-model';
import { getDimensions, is_safari, nanoid, resizeImage } from './util';
import type { EditorView } from 'prosemirror-view';
import type { EditorState } from 'prosemirror-state';

type ProgressCallback = (progress: number) => void;

// Upload image to `/api/upload-asset`
function upload(file: File, path: string, progressCallback: ProgressCallback) {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('path', path);

	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr.response);
				} else {
					reject(new Error(`Upload failed: ${xhr.status}`));
				}
			}
		};

		if (progressCallback) {
			xhr.upload.onprogress = (e) => {
				if (e.lengthComputable) {
					const percentComplete = (e.loaded / file.size) * 100;
					progressCallback(typeof percentComplete === 'number' ? percentComplete : 10);
				}
			};
		}
		xhr.open('PUT', '/api/upload-asset');
		xhr.send(formData);
	});
}

export default async function uploadAsset(file: File, path: string, onProgress: ProgressCallback) {
	return await upload(file, path, onProgress);
}

// Build the public URL for an uploaded asset
function assetUrl(path: string): string {
	// /api/assets/<path> served by the SvelteKit server
	return `/api/assets/${path}`;
}

// Get image metadata from an HTML file input
export async function getImageMetadataFromInput(input: HTMLInputElement) {
	if (!input.files) return;
	const file = input.files[0];

	const content_type = is_safari() ? 'image/jpeg' : 'image/webp';
	const extension = is_safari() ? 'jpg' : 'webp';

	const path = [nanoid(), extension].join('.');
	const maxWidth = 1440;
	const maxHeight = 1440;
	const quality = 0.8;

	const resizedBlob = await resizeImage(file, maxWidth, maxHeight, quality, content_type);
	const resizedFile = new File([resizedBlob], `${file.name.split('.')[0]}.${extension}`, {
		type: content_type
	});

	const src = assetUrl(path);
	return { src, resizedFile, path };
}

// Used by InsertImage component for uploading images within the article
export async function uploadImageFromEditor(
	alt: string,
	path: string,
	file: Blob,
	schema: Schema,
	editorView: EditorView,
	editorState: EditorState
) {
	const src = assetUrl(path);
	const { width, height } = await getDimensions(file as File);

	const noop = () => {};

	try {
		await uploadAsset(file as File, path, noop);

		const newImage = schema.nodes.image.createAndFill({
			src,
			width,
			height,
			alt
		});
		if (newImage) editorView.dispatch(editorState.tr.replaceSelectionWith(newImage));
		editorView.focus();
	} catch (err) {
		console.error(err);
	}

	return { alt, src };
}

// Used by Article component for uploading thumbnail
export async function uploadImage(path: string, file: Blob) {
	const noop = () => {};
	const src = assetUrl(path);

	try {
		const response = await uploadAsset(file as File, path, noop);
		// @ts-ignore
		return { src, fileId: JSON.parse(response)?.fileId };
	} catch (err) {
		console.error(err);
		return { src };
	}
}
