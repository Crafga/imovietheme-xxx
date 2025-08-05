import type { PageServerLoad } from './$types';
import { Categories, FiltersMovie, getMovieByID } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = async ({ params, url }) => {
    const id = params.id;
 
    const mvList = await getMovieByID(id);

    const cate = await Categories();
    
    return {
        MovieList: mvList.data,
        category: cate.data.categories,
    };
}