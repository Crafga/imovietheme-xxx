import type { HandleClientError } from '@sveltejs/kit';
import { storeTheme } from '$lib/stores/stores';
import { get } from 'svelte/store';

let initialized = false;

// Ultra-fast theme initialization
function initializeClientTheme() {
	if (initialized) return;
	initialized = true;
	
	// Get current theme immediately
	const currentTheme = document.body.getAttribute('data-theme') ?? 'skeleton';
	
	// Update store silently without triggering DOM update
	storeTheme.update(() => currentTheme);

	// Listen for theme changes from store (from layout reactive statements)
	storeTheme.subscribe((theme) => {
		if (theme && document.body.getAttribute('data-theme') !== theme) {
			// Use microtask for fastest possible update
			queueMicrotask(() => {
				document.body.setAttribute('data-theme', theme);
			});
		}
	});
}

// Initialize immediately - don't wait for DOMContentLoaded
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
	// Run as soon as script loads
	initializeClientTheme();
	
	// Backup: also run on DOMContentLoaded if not already initialized
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeClientTheme);
	}
}

export const handleError: HandleClientError = ({ error, event }) => {
	console.error('Client error:', error, event);
};