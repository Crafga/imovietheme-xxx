import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { MovieList, Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = async ({ params, url }) => {
    const cateName = params.name;
    const page = url.searchParams.get('page') || '1';

    const mvList = await FiltersMovie(page, cateName);
    const cate = await Categories();
    const tag = await Tags();
    
    return {
        MovieList: mvList.data,
        category: cate.data.categories,
        tags: tag.data.tags,
        cateName
    };
}