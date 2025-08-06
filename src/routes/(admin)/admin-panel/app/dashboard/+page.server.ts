import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { Categories, MovieList } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.session) {
		return new Response('Unauthorized', { status: 401 });
	}

    const cst = await db.user.findUnique({
		where: {
			id: locals.user?.id
		}
	});

	if (!cst || !cst.status) {
		return new Response('Unauthorized', { status: 401 });
	}

    const cate = await Categories();
    const mvList = await MovieList();

    const checkApi = cate.data.status === 200 ? true : false

    return {
        checkApi,
        mvList: mvList.data
    }
}