import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'https://client.crisp.chat',
					'https://settings.crisp.chat',
					'https://*.crisp.chat'
				],
				'style-src': [
					'self',
					'unsafe-inline',
					'https://client.crisp.chat',
					'https://fonts.googleapis.com'
				],
				'img-src': ['self', 'data:', 'blob:', 'https:'],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com', 'https://client.crisp.chat'],
				'connect-src': [
					'self',
					'https://client.crisp.chat',
					'https://*.crisp.chat',
					'wss://client.relay.crisp.chat',
					'wss://*.relay.crisp.chat'
				],
				'frame-src': [
					'self',
					'https://client.crisp.chat',
					'https://*.crisp.chat',
					'https://*.cloudflarestream.com'
				],
				'media-src': ['self', 'https:', 'blob:'],
				'worker-src': ['self', 'blob:'],
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'frame-ancestors': ['self']
			}
		}
	}
};

export default config;
