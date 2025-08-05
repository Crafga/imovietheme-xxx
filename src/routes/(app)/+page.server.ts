import type { PageServerLoad } from './$types';
import { MovieList, Categories, Tags } from '$lib/api/MoviesAPI';
import { db } from '$lib/server/db';

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