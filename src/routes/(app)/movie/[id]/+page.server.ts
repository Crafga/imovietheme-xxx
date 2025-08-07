import type { PageServerLoad } from './$types';
import { Categories, MovieList, getMovieByID } from '$lib/api/MoviesAPI';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, url, request }) => {
    const id = params.id;
 
    const mvList = await getMovieByID(id);
    const cate = await Categories();
    const settings = await db.settings.findFirst();
    const newMovie = await MovieList();

    const ads = await db.ads.findMany({
        where: {
            position: {
                in: ['A', 'BL', 'BR', 'CH', 'CBL', 'CBR', 'T', 'TBL', 'TBR']
            }
        },
        orderBy: {
            sortBy: 'desc'
        }
    })
    
    return {
        newMovie: newMovie.data.List.slice(0, 4),
        MovieList: mvList.data,
        category: cate.data.categories,
        settings,
        baseUrl: `${url.protocol}//${url.host}`,
        currentUrl: url.href,
        adsDataMovie: ads,
        url: `https://${request.headers.get('host') || 'localhost'}/movie/${mvList.data?.List?.id}`,
        meta: {
            title: mvList.data?.List?.Title,
            description: mvList.data?.List?.description,
            image: mvList.data?.List?.Img,
            url: `https://${request.headers.get('host') || 'localhost'}/movie/${mvList.data?.List?.id}`,
            slug: mvList.data?.List?.id,
            hashtags: mvList.data?.List?.Tag.join(",")
        }
    };
}