import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: LayoutServerLoad = async () => {
    const s = await db.settings.findFirst()

    return {
        set: s
    };
}