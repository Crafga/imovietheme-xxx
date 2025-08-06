import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ url }) => {
    const s = await db.settings.findFirst()
    const adsLF = await db.ads.findMany({
        where: {
            position: {
                in: ['L', 'R', 'FT']
            }
        }
    })

    return {
        set: s,
        url: url.pathname,
        baseUrl: `${url.protocol}//${url.host}`,
        adsLF
    };
}