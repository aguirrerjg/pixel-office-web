import { writable } from 'svelte/store';
import type { Lang } from './translations.js';

function createLangStore() {
	const { subscribe, set, update } = writable<Lang>('es');

	return {
		subscribe,
		set,
		toggle() {
			update(current => {
				const next: Lang = current === 'es' ? 'en' : 'es';
				localStorage.setItem('lang', next);
				// Full page navigation to ensure server handles redirects
				const path = window.location.pathname;
				const newPath = path.replace(/^\/(es|en)/, `/${next}`);
				window.location.href = newPath;
				return next;
			});
		},
		init() {
			const saved = localStorage.getItem('lang');
			if (saved === 'es' || saved === 'en') {
				set(saved);
			} else {
				const browserLang = navigator.language || navigator.languages?.[0] || 'es';
				const detected: Lang = browserLang.startsWith('es') ? 'es' : 'en';
				set(detected);
			}
			subscribe(value => {
				if (typeof document !== 'undefined') {
					document.documentElement.lang = value;
				}
			});
		}
	};
}

export const lang = createLangStore();
