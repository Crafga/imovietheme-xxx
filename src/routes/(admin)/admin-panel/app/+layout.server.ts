import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Check if admin is authenticated via Lucia
	if (!locals.session) {
		throw redirect(302, '/admin-panel');
	}

    const user = await db.user.findUnique({
		select: {
			id: true,
			username: true,
			role: true,
            status: true
		},
		where: {
			id: locals.user?.id
		}
	});

	if (!user) {
		redirect(302, '/admin-panel');
	}

	const s = await db.settings.findFirst()

	return {
		user,
		set: s
	};
};