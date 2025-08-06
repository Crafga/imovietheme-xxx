import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';
import { MovieList, Categories, Tags } from '$lib/api/MoviesAPI';

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = `${url.protocol}//${url.host}`;
	const settings = await db.settings.findFirst();
	const siteName = settings?.title ?? 'iMovie';
	const cateGories = await Categories();
	const tagsData = await Tags();
	const mvList = await MovieList();
	
	
	// Generate sitemap XML
	let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

	// Homepage
	sitemap += `
	<url>
		<loc>${baseUrl}/</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>daily</changefreq>
		<priority>1.0</priority>
	</url>
`;

	// Categories page
	sitemap += `
	<url>
		<loc>${baseUrl}/categories</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>
`;

	try {
		// Add movie pages from mvList
		const movies = mvList?.data?.List || [];
		for (const movie of movies) {
			sitemap += `
	<url>
		<loc>${baseUrl}/movie/${movie.id}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>`;
			
			// Add image tag if available
			if (movie.Img) {
				sitemap += `
		<image:image>
			<image:loc>${movie.Img}</image:loc>
			<image:title>${escapeXml(movie.Title)}</image:title>
		</image:image>`;
			}
			
			sitemap += `
	</url>
`;
		}
		
		// Add category pages from cateGories
		const categories = cateGories?.data?.categories || [];
		for (const category of categories) {
			sitemap += `
	<url>
		<loc>${baseUrl}/categories/${encodeURIComponent(category.name)}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
	</url>
`;
		}
		
		// Add tag pages from tagsData
		const tags = tagsData?.data?.tags || [];
		for (const tag of tags) {
			sitemap += `
	<url>
		<loc>${baseUrl}/tags/${encodeURIComponent(tag.name)}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.6</priority>
	</url>
`;
		}
		
	} catch (error) {
		console.error('Error generating sitemap:', error);
	}

	sitemap += `
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600' // Cache for 1 hour
		}
	});
};

// Helper functions


function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}