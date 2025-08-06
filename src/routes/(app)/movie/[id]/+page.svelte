<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import MobileCategories from '$lib/components/MobileCategories.svelte';
	import { generateMovieJsonLd, generateBreadcrumbJsonLd, createSeoTitle, truncateDescription, type SeoConfig } from '$lib/utils/seo';
	import AdsTopPlayer from '$lib/components/admin/AdsTopPlayer.svelte';
	import AdsBottomPlayer from '$lib/components/admin/AdsBottomPlayer.svelte';
	import AdsBottomTag from '$lib/components/admin/AdsBottomTag.svelte';

	export let data: PageData;

	$: movie = data.MovieList.List ?? [];
	
	// Floating overlay ad state
	let overlayAdVisible = true;
	
	const closeOverlayAd = () => {
		overlayAdVisible = false;
	};

	// SEO: Generate structured data and meta tags
	$: movieJsonLd = movie ? generateMovieJsonLd(movie, data.baseUrl) : null;
	
	$: breadcrumbJsonLd = movie ? generateBreadcrumbJsonLd([
		{ name: 'หน้าแรก', url: data.baseUrl },
		{ name: movie.Title, url: data.currentUrl }
	]) : null;

	$: seoConfig = movie ? {
		title: createSeoTitle(movie.Title, data.settings?.title ?? 'iMovie'),
		description: truncateDescription(movie.description || `ดู ${movie.Title} ออนไลน์ฟรี คุณภาพ HD`),
		keywords: [
			movie.Title,
			...(movie.Categories || []),
			...(movie.Tag || []),
			'ดูหนังออนไลน์',
			'หนังฟรี',
			'streaming'
		],
		canonical: data.currentUrl,
		image: movie.Img,
		imageAlt: movie.Title,
		type: 'video' as const,
		siteName: data.settings?.title ?? 'iMovie',
		locale: 'th_TH',
		video: movie.embed ? {
			url: movie.embed,
			type: 'text/html'
		} : undefined
	} as SeoConfig : null;

</script>

<svelte:head>
	{#if seoConfig}
		<!-- Dynamic SEO Meta Tags -->
		<title>{seoConfig.title}</title>
		<meta name="description" content={seoConfig.description} />
		<meta name="keywords" content={seoConfig.keywords?.join(', ')} />
		<link rel="canonical" href={seoConfig.canonical} />
		
		<!-- Open Graph Tags -->
		<meta property="og:title" content={seoConfig.title} />
		<meta property="og:description" content={seoConfig.description} />
		<meta property="og:type" content={seoConfig.type} />
		<meta property="og:url" content={seoConfig.canonical} />
		<meta property="og:site_name" content={seoConfig.siteName} />
		<meta property="og:locale" content={seoConfig.locale} />
		
		{#if seoConfig.image}
			<meta property="og:image" content={seoConfig.image} />
			<meta property="og:image:alt" content={seoConfig.imageAlt} />
			<meta property="og:image:width" content="1280" />
			<meta property="og:image:height" content="720" />
		{/if}
		
		{#if seoConfig.video}
			<meta property="og:video" content={seoConfig.video.url} />
			<meta property="og:video:type" content={seoConfig.video.type} />
		{/if}
		
		<!-- Twitter Card Tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={seoConfig.title} />
		<meta name="twitter:description" content={seoConfig.description} />
		{#if seoConfig.image}
			<meta name="twitter:image" content={seoConfig.image} />
			<meta name="twitter:image:alt" content={seoConfig.imageAlt} />
		{/if}
		
		<!-- Structured Data -->
		{#if movieJsonLd}
			{@html `<script type="application/ld+json">${JSON.stringify(movieJsonLd)}</script>`}
		{/if}
		
		{#if breadcrumbJsonLd}
			{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`}
		{/if}
	{:else}
		<title>ไม่พบหนัง - {data.settings?.title ?? 'iMovie'}</title>
		<meta name="description" content="ไม่พบหนังที่คุณกำลังมองหา" />
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>

<div class="pt-20">
	<!-- Top Advertisement Section -->
	<div class="container mx-auto p-2">
		<ol class="breadcrumb mt-1">
			<li class="crumb"><a class="anchor" href="/"><Icon icon="solar:home-angle-2-bold" width="30" /></a></li>
			<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
			<li>{movie.Title}</li>
		</ol>
	</div>

	<!--AdsTopPlayer-->
	<AdsTopPlayer ads={data.adsDataMovie}/>

	<!-- Content -->
	<div class="container mx-auto p-4 space-y-8">
		<!-- Video Player Container -->
		<div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
			<!-- svelte-ignore a11y-missing-attribute -->
			<iframe
				id="videoRefreshiframe"
				src="{movie.embed}"
				allowfullscreen
				scrolling="no"
				class="absolute inset-0 w-full h-full border-none"
			></iframe>
			
			<!-- Floating Overlay Ads -->
			<!-- {#if overlayAdVisible}
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-4">
				<div class="relative flex flex-row gap-2 md:gap-4 max-w-sm md:max-w-none">
					<button 
						on:click={closeOverlayAd}
						class="absolute -top-3 -right-3 w-8 h-8 md:w-8 md:h-8 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors duration-200 shadow-lg z-10 touch-manipulation"
					>
						<Icon icon="mdi:close" class="w-6 h-6 md:w-5 md:h-5" />
					</button>
					
					<div class="bg-surface-200-700-token shadow-2xl">
						<div class="w-40 h-24 md:w-80 md:h-36 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-center p-2 md:p-4">
							<span class="text-xs md:text-base">Player 1<br>160x96</span>
						</div>
					</div>
					
					<div class="bg-surface-200-700-token shadow-2xl">
						<div class="w-40 h-24 md:w-80 md:h-36 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-center p-2 md:p-4">
							<span class="text-xs md:text-base">Player 2<br>160x96</span>
						</div>
					</div>
				</div>
			</div>
			{/if} -->
		</div>
	</div>

	<!--AdsBottomPlayer-->
	<AdsBottomPlayer ads={data.adsDataMovie}/>

	<div class="p-4 md:p-8">
		<div class="container mx-auto p-4">
			<div class="flex flex-col md:flex-row gap-6 items-start">
				<img src="{movie.Img}" alt="{movie.Title}" loading="lazy" class="rounded-md">
				<!-- Info -->
				<div class="flex-1 space-y-4">
					<h1 class="h1 md:h2 font-bold ">{movie.Title}</h1>
					<div class="flex flex-wrap gap-2">
						{#each movie.Categories || [] as c}
							<a href="/categories/{c}">
								<span class="badge variant-soft-success hover:variant-soft-primary">{c}</span>
							</a>
						{/each}
					</div>
					<p class="text-lg opacity-90 max-w-3xl">{movie.description}</p>
					<p class="text-md opacity-90 max-w-3xl badge variant-soft-secondary">
						อัพเดทเมื่อ : {new Date(movie.createAt).toLocaleDateString('th-TH', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				</div>
			</div>
		</div>
	</div>


	<div class="p-4 md:p-8">
		<div class="container mx-auto p-4">
			<div class="flex flex-col md:flex-row gap-6 items-start">
				<!-- Info -->
				<div class="flex-1 text-white space-y-4">
					<div class="flex flex-wrap gap-2">
						<h3 class="h3 font-bold">
							Tags:
							{#each movie.Tag || [] as t}
								<a href="/tags/{t}">
									<span class="badge variant-soft-warning hover:variant-soft-primary">{t}</span>
								</a>
							{/each}
						</h3>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--movie similar-->
	<div class="container mx-auto p-4 md:p-8">
		<div class="space-y-6">
			<h2 class="h2 font-bold text-center md:text-center">หมวดหมู่ที่คล้ายกัน</h2>
			
			<!-- Similar Movies Grid -->
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4">
				<!-- Mock similar movies - replace with actual similar movie data -->
				{#each data.newMovie as v, i}
					<div class="movie-card group animate-fadeInUp">
						<a href="/movie/{v.id}" class="block">
							<!-- Image Container -->
							<div class="relative overflow-hidden rounded-md mb-3">
								<img 
									src="{v.Img}" 
									alt={v.Title} 
									loading="lazy" 
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>

								<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<!-- Play Button -->
								<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
									<div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
										<Icon icon="mdi:play" class="w-7 h-7 ml-0.5" />
									</div>
								</div>

								<!-- Categories overlay -->
								<div class="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
									<div class="flex flex-wrap gap-1">
										{#each (v.Categories) as cate}
											<span class="px-2 py-1 bg-white/20 backdrop-blur-sm text-xs rounded-full border border-white/30 text-white">
												{cate}
											</span>
										{/each}
									</div>
								</div>
							</div>
							<!-- Movie Title -->
							<h3 class="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary-500 transition-colors duration-200">
								{v.Title}
							</h3>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!--AdsBottomTag-->
	<AdsBottomTag ads={data.adsDataMovie} />

</div>
<MobileCategories categories={data.category}/>

