import type { PageServerLoad } from './$types';
import { Categories, Tags } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = (async () => {
    const cate = await Categories();
    const tag = await Tags();

	return {
        category: cate.data.categories,
        tags: tag.data.tags
    };
});