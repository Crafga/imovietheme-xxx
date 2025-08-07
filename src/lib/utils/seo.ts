export interface SeoConfig {
	title?: string;
	description?: string;
	keywords?: string[];
	canonical?: string;
	image?: string;
	imageAlt?: string;
	type?: 'website' | 'article' | 'video';
	siteName?: string;
	locale?: string;
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	video?: {
		url: string;
		type: string;
		width?: number;
		height?: number;
		duration?: number;
		thumbnail?: string;
	};
	noindex?: boolean;
	nofollow?: boolean;
}

export interface JsonLd {
	'@context': string;
	'@type': string;
	[key: string]: any;
}

export function generateSeoTags(config: SeoConfig): string {
	const tags: string[] = [];
	
	// Basic meta tags
	if (config.title) {
		tags.push(`<title>${escapeHtml(config.title)}</title>`);
		tags.push(`<meta property="og:title" content="${escapeHtml(config.title)}">`);
		tags.push(`<meta name="twitter:title" content="${escapeHtml(config.title)}">`);
	}
	
	if (config.description) {
		tags.push(`<meta name="description" content="${escapeHtml(config.description)}">`);
		tags.push(`<meta property="og:description" content="${escapeHtml(config.description)}">`);
		tags.push(`<meta name="twitter:description" content="${escapeHtml(config.description)}">`);
	}
	
	if (config.keywords?.length) {
		tags.push(`<meta name="keywords" content="${config.keywords.map(escapeHtml).join(', ')}">`);
	}
	
	if (config.canonical) {
		tags.push(`<link rel="canonical" href="${escapeHtml(config.canonical)}">`);
		tags.push(`<meta property="og:url" content="${escapeHtml(config.canonical)}">`);
	}
	
	// Image tags
	if (config.image) {
		tags.push(`<meta property="og:image" content="${escapeHtml(config.image)}">`);
		tags.push(`<meta name="twitter:image" content="${escapeHtml(config.image)}">`);
		tags.push(`<meta name="twitter:card" content="summary_large_image">`);
	}
	
	if (config.imageAlt) {
		tags.push(`<meta property="og:image:alt" content="${escapeHtml(config.imageAlt)}">`);
		tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(config.imageAlt)}">`);
	}
	
	// Open Graph type
	tags.push(`<meta property="og:type" content="${config.type || 'website'}">`);
	
	if (config.siteName) {
		tags.push(`<meta property="og:site_name" content="${escapeHtml(config.siteName)}">`);
	}
	
	if (config.locale) {
		tags.push(`<meta property="og:locale" content="${config.locale}">`);
	}
	
	if (config.author) {
		tags.push(`<meta name="author" content="${escapeHtml(config.author)}">`);
	}
	
	if (config.publishedTime) {
		tags.push(`<meta property="article:published_time" content="${config.publishedTime}">`);
	}
	
	if (config.modifiedTime) {
		tags.push(`<meta property="article:modified_time" content="${config.modifiedTime}">`);
	}
	
	// Video specific tags
	if (config.video) {
		tags.push(`<meta property="og:video" content="${escapeHtml(config.video.url)}">`);
		tags.push(`<meta property="og:video:type" content="${escapeHtml(config.video.type)}">`);
		
		if (config.video.width) {
			tags.push(`<meta property="og:video:width" content="${config.video.width}">`);
		}
		
		if (config.video.height) {
			tags.push(`<meta property="og:video:height" content="${config.video.height}">`);
		}
		
		if (config.video.thumbnail) {
			tags.push(`<meta property="og:video:thumbnail" content="${escapeHtml(config.video.thumbnail)}">`);
		}
	}
	
	// Robots meta tag
	const robotsDirectives: string[] = [];
	if (config.noindex) robotsDirectives.push('noindex');
	if (config.nofollow) robotsDirectives.push('nofollow');
	
	if (robotsDirectives.length > 0) {
		tags.push(`<meta name="robots" content="${robotsDirectives.join(', ')}">`);
	}
	
	return tags.join('\n');
}

export function generateMovieJsonLd(movie: any, baseUrl: string): JsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'Movie',
		name: movie.Title,
		description: movie.description,
		image: movie.Img,
		genre: movie.Categories || [],
		url: `${baseUrl}/movie/${movie.id}`,
		...(movie.duration && { duration: `PT${movie.duration}M` }),
		...(movie.releaseDate && { dateCreated: movie.releaseDate }),
		keywords: movie.Tag || [],
		aggregateRating: movie.rating ? {
			'@type': 'AggregateRating',
			ratingValue: movie.rating,
			bestRating: 10,
			worstRating: 1
		} : undefined
	};
}

export function generateWebsiteJsonLd(siteName: string, description: string, baseUrl: string): JsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteName,
		description: description,
		url: baseUrl,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${baseUrl}/search/{search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>): JsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export function createSeoTitle(pageTitle: string, siteName: string, separator = ' - '): string {
	return `${pageTitle}${separator}${siteName}`;
}

export function truncateDescription(text: string, maxLength = 160): string {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength - 3).trim() + '...';
}

export function generateShareableContent(movieData: any) {
	return {
		title: `🎬 ${movieData.title}`,
		description: movieData.description || `ดูหนัง ${movieData.title} ออนไลน์ฟรี`,
		url: movieData.url,
		hashtags: movieData.hashtags
	};
}