import type { PageServerLoad } from './$types';
import { Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, url }) => {
    const postName = params.name;
    const page = url.searchParams.get('page') || '1';

    const mvList = await FiltersMovie(page, '', '', postName);
    const cate = await Categories();
    const tag = await Tags();
    const settings = await db.settings.findFirst();
    
    return {
        MovieList: mvList.data,
        category: cate.data.categories,
        tags: tag.data.tags,
        postName,
        settings,
        baseUrl: `${url.protocol}//${url.host}`,
        currentUrl: url.href
    };
}