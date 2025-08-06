import type { PageServerLoad } from './$types';
import { Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, url }) => {
    const cateName = params.name;
    const page = url.searchParams.get('page') || '1';

    const mvList = await FiltersMovie(page, cateName);
    const cate = await Categories();
    const tag = await Tags();
    const settings = await db.settings.findFirst();
    
    return {
        MovieList: mvList.data,
        category: cate.data,
        tags: tag.data,
        cateName,
        settings,
        baseUrl: `${url.protocol}//${url.host}`,
        currentUrl: url.href
    };
}