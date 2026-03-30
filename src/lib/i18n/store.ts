import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';
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
				document.documentElement.lang = next;
				// Navigate to the same page in the new language
				const path = window.location.pathname;
				const newPath = path.replace(/^\/(es|en)/, `/${next}`);
				goto(newPath);
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
