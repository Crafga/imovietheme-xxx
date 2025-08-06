import type { PageServerLoad } from './$types';
import { MovieList } from '$lib/api/MoviesAPI';

export const load: PageServerLoad = async ({ url }) => {
    const newMovie = await MovieList();
    return {
        newMovie: newMovie.data.List.slice(0, 5),
        baseUrl: `${url.protocol}//${url.host}`,
        currentUrl: url.href,
        meta: {
            title: 'Terms of Service',
            description: 'Read our comprehensive Terms of Service that govern the use of our movie streaming platform and services.',
            canonical: `${url.protocol}//${url.host}/terms-of-services`,
            type: 'website' as const,
            lastModified: new Date().toISOString()
        }
    };
}