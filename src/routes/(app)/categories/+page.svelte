<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { createSeoTitle, truncateDescription, type SeoConfig } from '$lib/utils/seo';

	export let data: PageData;

	interface Category {
		id: string;
		name: string;
		icon?: string;
		gradient?: string;
		description?: string;
	}

	// Enhanced categories with icons and gradients
	const categories: Category[] = (data.category?.categories ?? []).map((cat: Category) => ({
		...cat,
	}));

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	// SEO Configuration for categories page
	$: seoConfig = {
		title: createSeoTitle('หมวดหมู่หนัง', data.settings?.title ?? 'iMovie'),
		description: truncateDescription('เลือกดูหนังตามหมวดหมู่ที่คุณชื่นชอบ ครบทุกประเภท ทุกแนว คุณภาพ HD'),
		keywords: [
			'หมวดหมู่หนัง',
			'ประเภทหนัง',
			'แนวหนัง',
			'หนังแอคชั่น',
			'หนังคอมมีดี้',
			'หนังดราม่า',
			'หนังสยองขวัญ',
			'หนังรักโรแมนติก',
			...(data.category?.categories?.map((cat: any) => cat.name) || [])
		],
		canonical: data.currentUrl,
		type: 'website' as const,
		siteName: data.settings?.title ?? 'iMovie',
		locale: 'th_TH'
	} as SeoConfig;
</script>

<svelte:head>
	<!-- Categories Page SEO Meta Tags -->
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
	
	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={seoConfig.title} />
	<meta name="twitter:description" content={seoConfig.description} />
</svelte:head>

<div class="relative overflow-hidden min-h-screen">
	<!-- Hero Section with Enhanced Design -->
	<section class="relative py-32 px-4">
		<!-- Enhanced Background Effects -->
		<div class="absolute inset-0 overflow-hidden">
			<!-- Gradient Mesh Background -->
			<div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
			
			<!-- Animated Particles -->
			{#if mounted}
				{#each Array(25) as _, i}
					<div 
						class="absolute rounded-full animate-float {i % 3 === 0 ? 'w-2 h-2 bg-blue-400/20' : i % 3 === 1 ? 'w-1 h-1 bg-purple-400/30' : 'w-3 h-3 bg-pink-400/10'}"
						style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 10}s; animation-duration: {10 + Math.random() * 8}s;"
					></div>
				{/each}
			{/if}
			
			<!-- Geometric Shapes -->
			<div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl animate-pulse"></div>
			<div class="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl animate-pulse" style="animation-delay: 2s;"></div>
		</div>

		<div class="container mx-auto text-center relative z-10">
			<div class="animate-fadeInUp mb-16">
				<!-- Enhanced Title -->
				<div class="mb-8">
					<div class="inline-flex items-center gap-4 mb-4">
						<div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
						<Icon icon="mdi:movie-open" class="text-4xl text-blue-400" />
						<div class="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
					</div>
					<h1 class="title-hero text-gradient mb-6 text-5xl md:text-7xl font-black">
						หมวดหมู่หนัง
					</h1>
				</div>
				
				<!-- Enhanced Description -->
				<div class="max-w-4xl mx-auto">
					<p class="text-xl md:text-3xl opacity-90 leading-relaxed mb-6">
						เลือกดูหนังตามประเภทที่คุณชื่นชอบ
					</p>
					<p class="text-lg md:text-xl text-gradient-gold font-semibold">
						✨ คุณภาพสูง ครบทุกรสนิยม พร้อมให้คุณเพลิดเพลิน ✨
					</p>
				</div>
				
				<!-- Stats Section -->
				<div class="flex flex-wrap justify-center gap-8 mt-12">
					<div class="glass-dark px-6 py-3 rounded-full">
						<span class="text-sm font-semibold text-blue-400">{categories.length} หมวดหมู่</span>
					</div>
					<div class="glass-dark px-6 py-3 rounded-full">
						<span class="text-sm font-semibold text-purple-400">คุณภาพ HD-4K</span>
					</div>
					<div class="glass-dark px-6 py-3 rounded-full">
						<span class="text-sm font-semibold text-pink-400">อัพเดททุกวัน</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Enhanced Categories Grid -->
	<section class="py-24 px-4">
		<div class="container mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-16 animate-fadeInUp">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">
					เลือกหมวดหมู่ที่คุณชื่นชอบ
				</h2>
				<div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
			</div>

			<!-- Categories Grid with Enhanced Design -->
			<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
				{#each categories as category, i}
					<a 
						href="/categories/{category.name}" 
						class="group relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fadeInUp"
						style="animation-delay: {i * 0.05}s"
					>
						<!-- Main Card Container -->
						<div class="relative aspect-[5/5] overflow-hidden rounded-2xl">
							<!-- Dynamic Gradient Background -->
							<div class="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-80"></div>
							
							<!-- Animated Pattern Overlay -->
							<div class="absolute inset-0 opacity-10">
								<div class="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width=&quot;60&quot; height=&quot;60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3e%3cdefs%3e%3cpattern id=&quot;grid&quot; width=&quot;60&quot; height=&quot;60&quot; patternUnits=&quot;userSpaceOnUse&quot;%3e%3cpath d=&quot;m 60 0 l 0 60 l -60 0 z&quot; fill=&quot;none&quot; stroke=&quot;%23ffffff&quot; stroke-width=&quot;1&quot;/%3e%3c/pattern%3e%3c/defs%3e%3crect width=&quot;100%25&quot; height=&quot;100%25&quot; fill=&quot;url(%23grid)&quot;/%3e%3c/svg%3e')] animate-pulse"></div>
							</div>

							<!-- Floating Elements -->
							<div class="absolute inset-0 overflow-hidden">
								<div class="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
								<div class="absolute top-12 left-6 w-2 h-2 bg-white/20 rounded-full animate-bounce" style="animation-delay: 1s"></div>
								<div class="absolute bottom-16 right-8 w-4 h-4 bg-white/10 rounded-full animate-bounce" style="animation-delay: 1.5s"></div>
							</div>

							<!-- Hover Shine Effect -->
							<div class="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
								<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
							</div>

							<!-- Content Container -->
							<div class="absolute inset-0 flex flex-col justify-between p-6">
								<!-- Bottom Section - Text -->
								<div class="text-center text-white">
									<h3 class="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
										{category.name}
									</h3>
									
									<!-- Action Button -->
									<div class="flex items-center justify-center gap-2 glass-dark px-4 py-2 rounded-full group-hover:bg-white/20 transition-colors duration-300">
										<span class="text-sm font-semibold">ดูหนัง</span>
										<Icon icon="mdi:arrow-right" class="text-sm group-hover:translate-x-1 transition-transform duration-300" />
									</div>
								</div>
							</div>
						</div>

						<!-- Glow Effect on Hover -->
						<div class="absolute -inset-1 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500 -z-10"></div>
					</a>
				{/each}
			</div>

		</div>
	</section>

</div>
