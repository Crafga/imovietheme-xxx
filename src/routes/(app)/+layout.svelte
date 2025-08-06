<script lang="ts">
	import '../../app.postcss';
	import type { LayoutData } from './$types';
	import Icon from '@iconify/svelte';
	import { getToastStore, LightSwitch, initializeStores, Toast, getDrawerStore, Modal } from '@skeletonlabs/skeleton'
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { alertError } from '$lib/utils/alerts';
	import { browser } from '$app/environment';
	import { storeTheme } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { generateWebsiteJsonLd, type JsonLd } from '$lib/utils/seo';

	export let data: LayoutData;
	// Floating UI for Popups
	// import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	initializeStores();
	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();

	let gtagData = data.set?.googleTag ?? '';

	// Get theme from data with fallback
	$: theme = data.set?.theme ?? 'skeleton';
	
	// Update theme when data changes - hooks.client will handle DOM updates
	$: if (browser && theme !== $storeTheme) {
		storeTheme.set(theme);
	}

	// storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	// Configure NProgress
	NProgress.configure({ minimum: 0.16, showSpinner: false });

	// Handle navigation loading states
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	let searchTerm = '';
	let leftAdVisible = true;
	let rightAdVisible = true;
	let bottomAdVisible = true;

	const handleKeyDown = async (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            // เช็คค่าว่างก่อนเรียก calculate
            if (!searchTerm) {
                toastStore.trigger(await alertError('ใส่ชื่อหนังเพื่อค้นหา'));
                return;
            }
			goto(`/search/${searchTerm}`);
			searchTerm = '';
        }
    };

	const closeLeftAd = () => {
		leftAdVisible = false;
	};

	const closeRightAd = () => {
		rightAdVisible = false;
	};

	const closeBottomAd = () => {
		bottomAdVisible = false;
	};

	// SEO: Generate structured data
	$: websiteJsonLd = generateWebsiteJsonLd(
		data.set?.title ?? 'iMovie',
		data.set?.description ?? 'ดูหนังออนไลน์ฟรี หนังใหม่ หนังชนโรง',
		data.baseUrl ?? 'https://example.com'
	);
</script>

<Toast position="t"/>
<Modal />

<svelte:head>
	<!-- Basic meta tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	<meta name="theme-color" content="#1f2937" />
	
	<!-- Global SEO meta tags -->
	<meta name="author" content={data.set?.title ?? 'iMovie'} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index, follow" />
	<meta name="language" content="th" />
	<meta property="og:locale" content="th_TH" />
	<meta property="og:site_name" content={data.set?.title ?? 'iMovie'} />
	<meta name="twitter:creator" content="@imovie" />
	<meta name="twitter:site" content="@imovie" />
	
	<!-- Favicon -->
	<link rel="icon" href={data.set?.favicon ?? '/player.png'} />
	<link rel="apple-touch-icon" href={data.set?.favicon ?? '/player.png'} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(websiteJsonLd)}</script>`}
</svelte:head>

<!-- Modern Navigation -->
<div class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-surface-800">
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between h-16 ">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2 animate-slideInLeft">
				<div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
					<Icon icon="mdi:movie-open-play-outline" class="w-5 h-5" />
				</div>
				<img src={data.set?.logo ?? '/logo3.png'} alt={data.set?.title ?? 'iMovie'} width="200" >
				<!-- <span class="text-xl font-bold text-gradient">iMovie</span> -->
			</a>

			<!-- Search Bar -->
			<div class="flex-1 max-w-md mx-8 hidden md:block">
				<div class="relative">
					<input 
						type="text" 
						placeholder="ค้นหาหนัง..."
						bind:value={searchTerm}
						on:keydown={handleKeyDown}
						class="input variant-form-material pr-4 px-4 py-2 pl-10"
					/>
					<Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
				</div>
			</div>

			<!-- Desktop Navigation -->
			<nav class="flex items-center space-x-1">
				<LightSwitch />
			</nav>
		</div>

		<!-- Mobile Search Bar -->
		<div class="md:hidden pb-4">
			<div class="relative">
				<input 
					type="text" 
					placeholder="ค้นหาหนัง..."
					bind:value={searchTerm}
					on:keydown={handleKeyDown}
					class=" px-4 py-2 pl-10 pr-4 rounded-xl input variant-form-material"
				/>
				<Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
			</div>
		</div>
	</div>
</div>

<!-- Floating Left Side Ads -->
{#if leftAdVisible}
	{@const leftAd = data.adsLF?.find(ad => ad.position === 'L')}
	{#if leftAd && (!leftAd.expired || new Date(leftAd.expired) > new Date())}
		<div class="fixed left-1 md:left-4 top-1/2 transform -translate-y-1/2 z-40">
			<div class="relative w-16 h-48 md:w-24 lg:w-32 md:h-64 lg:h-96 bg-surface-200-700-token shadow-lg">
				<!-- Close Button -->
				<button 
					on:click={closeLeftAd}
					class="absolute -top-2 -right-2 w-6 h-6 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-200 shadow-md"
				>
					<Icon icon="mdi:close" class="w-4 h-4" />
				</button>
				
				<a href={leftAd.url} target="_blank" class="block w-full h-full">
					<img 
						src={leftAd.image} 
						alt={leftAd.title} 
						class="w-full h-full object-cover rounded"
					/>
				</a>
			</div>
		</div>
	{/if}
{/if}

<!-- Floating Right Side Ads -->
{#if rightAdVisible}
	{@const rightAd = data.adsLF?.find(ad => ad.position === 'R')}
	{#if rightAd && (!rightAd.expired || new Date(rightAd.expired) > new Date())}
		<div class="fixed right-1 md:right-4 top-1/2 transform -translate-y-1/2 z-40">
			<div class="relative w-16 h-48 md:w-24 lg:w-32 md:h-64 lg:h-96 bg-surface-200-700-token shadow-lg">
				<!-- Close Button -->
				<button 
					on:click={closeRightAd}
					class="absolute -top-2 -left-2 w-6 h-6 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-200 shadow-md"
				>
					<Icon icon="mdi:close" class="w-4 h-4" />
				</button>
				
				<a href={rightAd.url} target="_blank" class="block w-full h-full">
					<img 
						src={rightAd.image} 
						alt={rightAd.title} 
						class="w-full h-full object-cover rounded"
					/>
				</a>
			</div>
		</div>
	{/if}
{/if}

<!-- Fixed Bottom Ad -->
{#if bottomAdVisible}
	{@const footerAd = data.adsLF?.find(ad => ad.position === 'FT')}
	{#if footerAd && (!footerAd.expired || new Date(footerAd.expired) > new Date())}
		<div class="fixed left-0 right-0 z-50 lg:bottom-0 bottom-16">
			<div class="relative max-w-6xl mx-auto bg-surface-200-700-token shadow-lg">
				<a href={footerAd.url} target="_blank" class="block w-full h-full">
					<img 
						src={footerAd.image} 
						alt={footerAd.title} 
						class="w-full h-full object-cover rounded"
					/>
				</a>
				<button 
					on:click={closeBottomAd}
					class="absolute -top-2 right-0 w-6 h-6 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-200 shadow-md"
				>
					<Icon icon="mdi:close" class="w-4 h-4" />
				</button>
			</div>
		</div>
	{/if}
{/if}

<!-- Main Content -->
<main class="pt-20 min-h-screen pb-28 lg:pb-20">
	<slot />
</main>

<!-- Footer -->
<footer class="bg-surface-backdrop-token">
	<div class="container mx-auto px-4">
		<div class="border-t border-white/10 mt-8 pt-4 pb-4 text-center text-sm opacity-75">
			<span>{data.set?.footerText ?? ''}</span>
			<hr class="mt-2 mb-2">
			<span>ติดต่อขอหนัง-คลิป (Ask for Porno Videos) <a href="/terms-of-services" class="hover:text-rose-500">Terms Of Service</a></span>
			<p>Copyrights &copy; 2025 หนังโป๊ หนังx หนังโป๊ออนไลน์ คลิปโป๊ คลิปหลุด คลิปแอบถ่าย หนังโป๊ไทย XXX PORN หี เย็ด หนังAV ดูหนังโป๊ฟรี {data.set?.title ?? 'iMovie'} All rights reserved.</p>
		</div>
	</div>
</footer>