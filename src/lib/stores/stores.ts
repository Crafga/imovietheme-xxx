import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create reactive theme store with optimized DOM handling
function createThemeStore() {
	// Get initial theme from DOM or fallback to skeleton
	const initialTheme = browser ? (document.body.getAttribute('data-theme') ?? 'skeleton') : 'skeleton';
	
	const { subscribe, set, update } = writable(initialTheme);

	return {
		subscribe,
		set: (theme: string) => {
			if (browser && document.body.getAttribute('data-theme') !== theme) {
				// Use queueMicrotask for fastest possible DOM update
				queueMicrotask(() => {
					document.body.setAttribute('data-theme', theme);
				});
			}
			set(theme);
		},
		update: (fn: (value: string) => string) => {
			update((currentTheme) => {
				const newTheme = fn(currentTheme);
				if (browser && document.body.getAttribute('data-theme') !== newTheme) {
					queueMicrotask(() => {
						document.body.setAttribute('data-theme', newTheme);
					});
				}
				return newTheme;
			});
		}
	};
}

export const storeTheme = createThemeStore();

export const storePreview = writable(false);