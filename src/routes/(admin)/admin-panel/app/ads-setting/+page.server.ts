import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.session) {
		return new Response('Unauthorized', { status: 401 });
	}

    const cst = await db.user.findUnique({
		where: {
			id: locals.user?.id
		}
	});

	if (!cst || !cst.status) {
		return new Response('Unauthorized', { status: 401 });
	}

    const ads = await db.ads.findMany()

    return {
        adsData: ads
    }
}