import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { MovieList, Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, url }) => {
    const tagName = params.name;
    const page = url.searchParams.get('page') || '1';

    const mvList = await FiltersMovie(page, '', tagName, '');
    const cate = await Categories();
    const tag = await Tags();
    const settings = await db.settings.findFirst();
    
    return {
        MovieList: mvList.data,
        category: cate.data.categories,
        tags: tag.data.tags,
        tagName,
        settings,
        baseUrl: `${url.protocol}//${url.host}`,
        currentUrl: url.href
    };
}