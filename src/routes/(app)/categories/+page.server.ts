import type { PageServerLoad } from './$types';
import { Categories, Tags } from '$lib/api/MoviesAPI';
import { db } from '$lib/server/db';

export const load: PageServerLoad = (async ({ url }) => {
    const cate = await Categories();
    const tag = await Tags();
    const settings = await db.settings.findFirst();

	return {
        category: cate.data.categories,
        tags: tag.data.tags,
        settings,
        baseUrl: `${url.protocol}//${url.host}`,
        currentUrl: url.href
    };
});