import type { Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/Lucia';
import { db } from '$lib/server/db';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

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

	// 🗂️ Static file serving for production
	if (pathname.startsWith('/uploads/') || pathname.startsWith('/ads/')) {
		try {
			const filePath = path.join(process.cwd(), 'static', event.url.pathname);
			if (existsSync(filePath)) {
				const file = await readFile(filePath);
				const ext = path.extname(filePath).toLowerCase();
				
				let contentType = 'application/octet-stream';
				if (ext === '.png') contentType = 'image/png';
				else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
				else if (ext === '.gif') contentType = 'image/gif';
				else if (ext === '.webp') contentType = 'image/webp';
				else if (ext === '.svg') contentType = 'image/svg+xml';
				
				return new Response(file, {
					headers: {
						'Content-Type': contentType,
						'Cache-Control': 'public, max-age=31536000'
					}
				});
			}
		} catch (err) {
			console.error('Static file serving error:', err);
		}
		// Return 404 if file not found
		return new Response('Not Found', { status: 404 });
	}
	
	const ThemeSetting = await db.settings.findFirst();
	const theme = ThemeSetting?.theme ?? 'skeleton';

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			// Replace both empty and existing data-theme attributes
			// Ensure theme is properly set on body tag
			return html
				.replace(/data-theme="[^"]*"/g, `data-theme="${theme}"`)
				.replace('data-theme=""', `data-theme="${theme}"`)
				.replace('<body', `<body data-theme="${theme}"`);
		}
	});

	response.headers.delete('Link');
	response.headers.delete('x-sveltekit-page');
	response.headers.delete('Via');

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	return response;
};