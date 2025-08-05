import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { MovieList, Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = (async ({ url }) => {

    const page = url.searchParams.get('page') || '1';

    const mvList = await MovieList(page);
    const cate = await Categories();
    const tag = await Tags();

	return {
        MovieList: mvList.data,
        category: cate.data.categories,
        tags: tag.data.tags
    };
});