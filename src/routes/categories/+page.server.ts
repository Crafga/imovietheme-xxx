import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { MovieList, Categories, Tags, FiltersMovie } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = (async () => {
    const cate = await Categories();
    const tag = await Tags();

	return {
        category: cate.data.categories,
        tags: tag.data.tags
    };
});