import { writable } from 'svelte/store';

type Theme = 'dark' | 'light';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('dark');

	return {
		subscribe,
		toggle() {
			update(current => {
				const next: Theme = current === 'dark' ? 'light' : 'dark';
				localStorage.setItem('theme', next);
				document.documentElement.setAttribute('data-theme', next);
				return next;
			});
		},
		init() {
			const saved = localStorage.getItem('theme') as Theme | null;
			if (saved === 'dark' || saved === 'light') {
				set(saved);
				document.documentElement.setAttribute('data-theme', saved);
			}
		}
	};
}

export const theme = createThemeStore();
