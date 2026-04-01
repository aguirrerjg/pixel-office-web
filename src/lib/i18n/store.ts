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
			// URL locale takes priority over everything
			const pathLang = window.location.pathname.match(/^\/(es|en)/)?.[1] as Lang | undefined;
			if (pathLang) {
				set(pathLang);
				localStorage.setItem('lang', pathLang);
			} else {
				// No locale in URL — detect and redirect
				let detected: Lang;
				const saved = localStorage.getItem('lang');
				if (saved === 'es' || saved === 'en') {
					detected = saved;
				} else {
					const browserLang = navigator.language || navigator.languages?.[0] || 'es';
					detected = browserLang.startsWith('es') ? 'es' : 'en';
				}
				// Redirect to /{lang}{current_path}
				const path = window.location.pathname;
				const search = window.location.search;
				const hash = window.location.hash;
				window.location.replace(`/${detected}${path === '/' ? '' : path}${search}${hash}`);
				return;
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
