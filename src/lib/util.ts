// Random id generator using crypto.getRandomValues (server-safe, no nanoid dependency)
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function nanoid(size = 21): string {
	const bytes = crypto.getRandomValues(new Uint8Array(size));
	let id = '';
	for (let i = 0; i < size; i++) {
		id += ALPHABET[bytes[i] % ALPHABET.length];
	}
	return id;
}

// Checks if browser is Safari
export function is_safari(): boolean {
	const chrome_agent = navigator.userAgent.indexOf('Chrome') > -1;
	let safari_agent = navigator.userAgent.indexOf('Safari') > -1;
	if (chrome_agent && safari_agent) safari_agent = false;
	return safari_agent;
}

// Concatenates a list of CSS class names while filtering out any empty or falsy values
export function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

// Formats date in a legible way — locale es-ES
export function formatDate(date: Date, withTime: boolean = false): string {
	if (withTime) {
		if (date.toDateString() === new Date().toDateString()) {
			return date.toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: false });
		} else {
			const opts: Intl.DateTimeFormatOptions = {
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: false
			};
			if (date.getFullYear() !== new Date().getFullYear()) {
				opts.year = 'numeric';
			}
			return date.toLocaleDateString('es-ES', opts);
		}
	} else {
		return date.toLocaleDateString('es-ES', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
}

// Custom implementation of debounce function
export function debounce(params: { func: () => void; duration: number; [key: string]: any }) {
	let timer: ReturnType<typeof setTimeout>;

	return {
		update() {
			clearTimeout(timer);
			timer = setTimeout(params.func, params.duration);
		},
		destroy() {
			clearTimeout(timer);
		}
	};
}

/**
 * Extract teaser from HTML content string (server-safe, no document dependency).
 * Strips HTML tags and returns first 512 characters of paragraph text.
 */
export function extractTeaser(html: string): string {
	if (!html) return '';
	// Extract text content from <p> tags using regex (server-safe)
	const paragraphs: string[] = [];
	const pRegex = /<p[^>]*>(.*?)<\/p>/gis;
	let match: RegExpExecArray | null;
	while ((match = pRegex.exec(html)) !== null) {
		// Strip inner HTML tags
		const text = match[1].replace(/<[^>]*>/g, '').trim();
		if (text) paragraphs.push(text);
	}
	const teaser = paragraphs.join(' ');
	if (teaser.length > 512) {
		return teaser.slice(0, 512).concat('…');
	}
	return teaser;
}

// Utility function for making a fetch request
export async function fetchJSON<T = any>(method: string, url: string, data?: unknown): Promise<T> {
	const response = await fetch(url, {
		method,
		body: data !== undefined ? JSON.stringify(data) : undefined,
		headers: {
			'content-type': 'application/json'
		}
	});
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}

/**
 * Resize image to the given width and height (client-only, uses canvas).
 */
export function resizeImage(
	file: Blob,
	maxWidth: number,
	maxHeight: number,
	quality: number,
	content_type: string
): Promise<Blob> {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	return new Promise<Blob>((resolve, reject) => {
		reader.onload = (event) => {
			const image = new Image();
			if (event.target?.result) image.src = event.target.result as string;
			image.onload = () => {
				let width = image.width;
				let height = image.height;
				let newWidth = width;
				let newHeight = height;
				if (width > maxWidth) {
					newWidth = maxWidth;
					newHeight = (height * maxWidth) / width;
				}
				if (newHeight > maxHeight) {
					newWidth = (newWidth * maxHeight) / newHeight;
					newHeight = maxHeight;
				}
				const canvas = document.createElement('canvas');
				canvas.width = newWidth;
				canvas.height = newHeight;
				const context = canvas.getContext('2d');
				context?.drawImage(image, 0, 0, newWidth, newHeight);
				canvas.toBlob(
					(blob) => {
						if (blob) resolve(blob);
					},
					content_type,
					quality
				);
			};
			image.onerror = (error) => reject(error);
		};
		reader.onerror = (error) => reject(error);
	});
}

/**
 * Get image dimensions from a file (client-only).
 */
export async function getDimensions(file: File): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const img = new window.Image();
		img.onload = function (this: HTMLImageElement) {
			resolve({ width: this.width, height: this.height });
		};
		img.onerror = function () {
			reject(img.error);
		};
		img.src = URL.createObjectURL(file);
	});
}
