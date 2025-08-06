import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = `${url.protocol}//${url.host}`;
	
	const robots = `User-agent: *
Allow: /
Disallow: /admin-panel/
Disallow: /api/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*ref=*
Disallow: /search/*?*

# Specific bot rules
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for other bots
Crawl-delay: 2
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=86400' // Cache for 24 hours
		}
	});
};