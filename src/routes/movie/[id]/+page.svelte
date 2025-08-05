<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import MobileCategories from '$lib/components/MobileCategories.svelte';

	export let data: PageData;

	$: movie = data.MovieList.ListFilter ?? [];
	
	// Floating overlay ad state
	let overlayAdVisible = true;
	
	const closeOverlayAd = () => {
		overlayAdVisible = false;
	};

</script>

<svelte:head>
	{#if movie}
		<title>{movie[0].Title} - iMovie</title>
		<meta name="description" content={movie[0].description} />
	{:else}
		<title>ไม่พบหนัง - iMovie</title>
	{/if}
</svelte:head>

<div class="pt-20">
	<!-- Top Advertisement Section -->
	<div class="container mx-auto p-2">
		<ol class="breadcrumb mt-1">
			<li class="crumb"><a class="anchor" href="/"><Icon icon="solar:home-angle-2-bold" width="30" /></a></li>
			<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
			<li>{movie[0].Title}</li>
		</ol>
	</div>
	<div class="container mx-auto p-2 md:p-4">
		<div class="flex flex-row justify-center items-start gap-1 md:gap-4 overflow-x-auto">
			<!-- Left Vertical Ad -->
			<div class="flex-shrink-0">
				<div class="bg-surface-200-700-token shadow-lg">
					<div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
						<span class="text-xs md:text-sm">โฆษณาซ้าย<br>180x300</span>
					</div>
				</div>
			</div>
			
			<!-- Center Horizontal Ad -->
			<div class="flex-1 min-w-0">
				<div class="bg-surface-200-700-token shadow-lg mb-1">
					<div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
						<span class="text-base md:text-lg">โฆษณากลาง - 848x148</span>
					</div>
				</div>
				<div class="bg-surface-200-700-token shadow-lg mb-1">
					<div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
						<span class="text-base md:text-lg">โฆษณากลาง - 848x148</span>
					</div>
				</div>
			</div>
			
			<!-- Right Vertical Ad -->
			<div class="flex-shrink-0">
				<div class="bg-surface-200-700-token shadow-lg">
					<div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
						<span class="text-xs md:text-sm">โฆษณาขวา<br>180x300</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="container mx-auto p-4 space-y-8">
		<!-- Video Player Container -->
		<div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
			<!-- svelte-ignore a11y-missing-attribute -->
			<iframe
				id="videoRefreshiframe"
				src="{movie[0].embed}"
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

	<div class="container mx-auto p-2 md:p-4">
		<div class="flex flex-row justify-center items-start gap-1 md:gap-4 overflow-x-auto">
			<!-- Left Vertical Ad -->
			<div class="flex-shrink-0">
				<div class="bg-surface-200-700-token shadow-lg">
					<div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
						<span class="text-xs md:text-sm">โฆษณาซ้าย<br>180x300</span>
					</div>
				</div>
			</div>
			
			<!-- Center Horizontal Ad -->
			<div class="flex-1 min-w-0">
				<div class="bg-surface-200-700-token shadow-lg mb-1">
					<div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
						<span class="text-base md:text-lg">โฆษณากลาง - 848x148</span>
					</div>
				</div>
				<div class="bg-surface-200-700-token shadow-lg mb-1">
					<div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
						<span class="text-base md:text-lg">โฆษณากลาง - 848x148</span>
					</div>
				</div>
			</div>
			
			<!-- Right Vertical Ad -->
			<div class="flex-shrink-0">
				<div class="bg-surface-200-700-token shadow-lg">
					<div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
						<span class="text-xs md:text-sm">โฆษณาขวา<br>180x300</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="p-4 md:p-8">
		<div class="container mx-auto p-4">
			<div class="flex flex-col md:flex-row gap-6 items-start">
				<img src="{movie[0].Img}" alt="{movie[0].Title}" loading="lazy" class="rounded-md">
				<!-- Info -->
				<div class="flex-1 space-y-4">
					<h1 class="h1 md:h2 font-bold ">{movie[0].Title}</h1>
					<div class="flex flex-wrap gap-2">
						{#each movie[0].Categories || [] as c}
							<a href="/categories/{c}">
								<span class="badge variant-soft-surface hover:variant-soft-primary">{c}</span>
							</a>
						{/each}
					</div>
					<p class="text-lg opacity-90 max-w-3xl">{movie[0].description}</p>
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
							{#each movie[0].Tag || [] as t}
								<a href="/tags/{t}">
									<span class="badge variant-soft-surface hover:variant-soft-primary">{t}</span>
								</a>
							{/each}
						</h3>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto p-2 md:p-4">
		<div class="flex flex-row justify-center items-start gap-1 md:gap-4 overflow-x-auto">
			<!-- Left Vertical Ad -->
			<div class="flex-shrink-0">
				<div class="bg-surface-200-700-token shadow-lg">
					<div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
						<span class="text-xs md:text-sm">โฆษณาซ้าย<br>180x300</span>
					</div>
				</div>
			</div>
			
			<!-- Center Horizontal Ad -->
			<div class="flex-1 min-w-0">
				<div class="bg-surface-200-700-token shadow-lg mb-1">
					<div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
						<span class="text-base md:text-lg">โฆษณากลาง - 848x148</span>
					</div>
				</div>
				<div class="bg-surface-200-700-token shadow-lg mb-1">
					<div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
						<span class="text-base md:text-lg">โฆษณากลาง - 848x148</span>
					</div>
				</div>
			</div>
			
			<!-- Right Vertical Ad -->
			<div class="flex-shrink-0">
				<div class="bg-surface-200-700-token shadow-lg">
					<div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
						<span class="text-xs md:text-sm">โฆษณาขวา<br>180x300</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<MobileCategories categories={data.category}/>

