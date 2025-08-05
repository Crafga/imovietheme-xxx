<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import SidebarCategories from '$lib/components/SidebarCategories.svelte';
	import MobileCategories from '$lib/components/MobileCategories.svelte';
	import { getPageRange } from '$lib/utils/Helpers';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: movies = data.MovieList.ListFilter ?? [];

	$: currentPage = data.MovieList.currentPage ?? 1
	$: totalPages = data.MovieList.totalPages ?? 0

	$: pageList = getPageRange(currentPage, totalPages);

	$: filteredMovies = movies;
	let isLoading = false;

	const filterMovies = () => {
		filteredMovies = movies;
	}

	// เรียกใช้เมื่อเริ่มต้น
	onMount(() => {
		filterMovies();
	});

</script>

<svelte:head>
	<title>iMovie - ดูหนังออนไลน์คุณภาพสูง</title>
	<meta name="description" content="ดูหนังออนไลน์คุณภาพสูง ครบทุกเรื่อง ทุกหมวดหมู่" />
</svelte:head>

<div class="container mx-auto p-4">
	<div class="flex gap-6">
		<!-- Sidebar Categories -->
		<SidebarCategories categories={data.category}/>

		<!-- Main Content -->
		<div class="flex-1 mt-10">
			<!-- Header Controls -->
			<div class="card p-4 mb-6 rounded-lg">
				<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 class="text-2xl font-bold mb-2">
							ผลการค้นหา: {data.postName}
						</h1>
					</div>
				</div>
			</div>

			<!-- Loading State -->
			{#if isLoading}
				<div class="flex items-center justify-center py-12">
					<div class="text-center">
						<Icon icon="mdi:loading" class="animate-spin w-8 h-8 mx-auto mb-4" />
						<p class="text-lg">กำลังโหลดข้อมูล...</p>
					</div>
				</div>
			{:else}
				<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4">
					{#each filteredMovies as movie, i}
						<div class="movie-card group animate-fadeInUp">
							<a href="/movie/{movie.Title}" class="block">
								<!-- Image Container -->
								<div class="relative overflow-hidden rounded-md mb-3">
									<img 
										src={movie.Img} 
										alt={movie.Title}
										class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
									/>
									
									<!-- Dark Overlay on Hover -->
									<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

									<!-- Play Button -->
									<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
										<div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
											<Icon icon="mdi:play" class="w-7 h-7 ml-0.5" />
										</div>
									</div>

									<!-- Tags on Hover -->
									<div class="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
										<div class="flex flex-wrap gap-1">
											{#each movie.Categories as cate}
												<span class="px-2 py-1 bg-white/20 backdrop-blur-sm text-xs rounded-full border border-white/30">
													{cate}
												</span>
											{/each}
										</div>
									</div>
								</div>

								<!-- Movie Title -->
								<div class="px-1">
									<h3 class="text-sm md:text-base text-center line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
										{movie.Title}
									</h3>
								</div>
							</a>
						</div>
					{/each}
				</div>

			{/if}
		</div>
	</div>
</div>

<!-- Mobile Categories (Bottom Sheet Style) -->
<MobileCategories categories={data.category}/>

<!-- Add bottom padding for mobile -->
<div class="lg:hidden h-20"></div>

<style lang="postcss">
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Movie Card Styles */  
	.movie-card {
		@apply transition-all duration-300 ease-out;
	}

</style>