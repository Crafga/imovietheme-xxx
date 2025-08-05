import type { Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/Lucia';
import { db } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 404 });
	}

	const pathname = event.url.pathname.toLowerCase();

	
	const isPublicAdminRoute = pathname === '/admin-panel' || pathname === '/admin-panel/logout';
	const isProtectedAdminRoute = (!isPublicAdminRoute) || pathname.startsWith('/admin-panel/app/dashboard') || pathname.startsWith('/admin-panel/app/settings')

	if (pathname.startsWith('/admin-panel/app') || isProtectedAdminRoute) {
		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;
			const response = await resolve(event);
			response.headers.delete('Link');
			response.headers.delete('x-sveltekit-page');
			return response;
		}
	
		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			// sveltekit types deviates from the de-facto standard
			// you can use 'as any' too
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
			if (!session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: ".",
					...sessionCookie.attributes
				});
			}
		}
		event.locals.user = user;
		event.locals.session = session;
	}

	let theme = 'skeleton';
	const ThemeSetting = await db.settings.findFirst();
	if (ThemeSetting) {
		theme = `${ThemeSetting.theme}`;
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
	response.headers.delete('Link');
	response.headers.delete('x-sveltekit-page');

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	return response;
};