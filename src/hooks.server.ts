import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 404 });
	}
	
	const response = await resolve(event);
	response.headers.delete('Link');
	response.headers.delete('x-sveltekit-page');
	return response;
};