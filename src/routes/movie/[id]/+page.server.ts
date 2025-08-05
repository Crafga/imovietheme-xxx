import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { MovieList, Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = async ({ params, url }) => {
    const postName = params.id;
    const page = url.searchParams.get('page') || '1';
 
    const mvList = await FiltersMovie(page, '', '', postName);

    const cate = await Categories();
    
    return {
        MovieList: mvList.data,
        category: cate.data.categories,
        postName
    };
}