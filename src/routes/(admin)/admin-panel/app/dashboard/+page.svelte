<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { fly, scale } from 'svelte/transition';
    import { quartOut } from 'svelte/easing';
    import Icon from '@iconify/svelte';
    
    export let data: PageData;
    
    let mounted = false;
    let pulseAnimation = false;

    let movies = data.mvList?.List ?? []
    
    // Filter movies from today
    const today = new Date().toDateString();
    const todayMovies = movies.filter((movie: { createAt: string }) => {
        const movieDate = new Date(movie.createAt).toDateString();
        return movieDate === today;
    });
    onMount(() => {
        mounted = true;
        
        setInterval(() => {
            pulseAnimation = true;
            setTimeout(() => {
                pulseAnimation = false;
            }, 1000);
        }, 3000);
    });
</script>

{#if mounted}
<div class="container mx-auto p-8 space-y-8">
    <div class="flex items-center justify-between">
        <h1 class="h1 font-bold">Dashboard</h1>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
            class="card variant-ghost-primary p-6 relative overflow-hidden"
            in:fly="{{ y: 50, duration: 600, delay: 200, easing: quartOut }}"
        >
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div 
                            class="w-4 h-4 rounded-full transition-all duration-500 {data.checkApi ? 'bg-success-500' : 'bg-error-500'}"
                            class:animate-ping={pulseAnimation && data.checkApi}
                        ></div>
                        {#if data.checkApi}
                            <div class="absolute inset-0 w-4 h-4 rounded-full bg-success-500 animate-pulse"></div>
                        {/if}
                    </div>
                    <h3 class="h3 font-semibold">API Status</h3>
                </div>
                
                <div class="text-2xl transition-transform duration-300 hover:scale-110">
                    {#if data.checkApi}
                        <div in:scale="{{ duration: 400, delay: 300 }}">
                            <Icon 
                                icon="mdi:check-circle" 
                                class="text-success-500"
                            />
                        </div>
                    {:else}
                        <div in:scale="{{ duration: 400, delay: 300 }}">
                            <Icon 
                                icon="mdi:close-circle" 
                                class="text-error-500"
                            />
                        </div>
                    {/if}
                </div>
            </div>
            
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm opacity-75">Connection Status:</span>
                    <span class="badge {data.checkApi ? 'variant-filled-success' : 'variant-filled-error'} font-medium">
                        {data.checkApi ? 'Online' : 'Offline'}
                    </span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-sm opacity-75">Response Code:</span>
                    <span class="font-mono text-sm {data.checkApi ? 'text-success-500' : 'text-error-500'}">
                        {data.checkApi ? '200' : 'Error'}
                    </span>
                </div>
                
                <div class="w-full bg-surface-300 rounded-full h-2 overflow-hidden">
                    <div 
                        class="h-full transition-all duration-1000 rounded-full {data.checkApi ? 'bg-success-500' : 'bg-error-500'}"
                        style="width: {data.checkApi ? '100%' : '0%'}"
                        in:fly="{{ x: -100, duration: 800, delay: 500 }}"
                    ></div>
                </div>
            </div>
            
            <div class="absolute -top-2 -right-2 w-16 h-16 rounded-full {data.checkApi ? 'bg-success-500/10' : 'bg-error-500/10'} blur-xl"></div>
            <div class="absolute -bottom-2 -left-2 w-12 h-12 rounded-full {data.checkApi ? 'bg-success-500/5' : 'bg-error-500/5'} blur-lg"></div>
        </div>
        
        <!-- Today's Movies Card -->
        <div 
            class="card variant-ghost-secondary p-6 relative overflow-hidden"
            in:fly="{{ y: 50, duration: 600, delay: 400, easing: quartOut }}"
        >
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-full bg-secondary-500/20">
                        <Icon 
                            icon="mdi:calendar-today" 
                            class="text-secondary-500 w-6 h-6"
                        />
                    </div>
                    <h3 class="h3 font-semibold">Today's Movies</h3>
                </div>
                
                <div class="badge variant-filled-secondary text-lg font-bold px-3 py-1">
                    {todayMovies.length}
                </div>
            </div>
            
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm opacity-75">Added Today:</span>
                    <span class="font-semibold text-secondary-500">{todayMovies.length} movies</span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-sm opacity-75">Total Movies:</span>
                    <span class="font-mono text-sm">{todayMovies.length}</span>
                </div>
                
                <div class="w-full bg-surface-300 rounded-full h-2 overflow-hidden">
                    <div 
                        class="h-full bg-secondary-500 transition-all duration-1000 rounded-full"
                        style="width: {movies.length > 0 ? (todayMovies.length / movies.length) * 100 : 0}%"
                        in:fly="{{ x: -100, duration: 800, delay: 700 }}"
                    ></div>
                </div>
            </div>
            
            <div class="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-secondary-500/10 blur-xl"></div>
            <div class="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-secondary-500/5 blur-lg"></div>
        </div>
        
        <!-- Today's Movies List Card -->
        {#if todayMovies.length > 0}
        <div 
            class="card variant-ghost-tertiary p-6 col-span-full relative overflow-hidden"
            in:fly="{{ y: 50, duration: 600, delay: 600, easing: quartOut }}"
        >
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-full bg-tertiary-500/20">
                        <Icon 
                            icon="mdi:movie-open" 
                            class="text-tertiary-500 w-6 h-6"
                        />
                    </div>
                    <h3 class="h3 font-semibold">Recent Movies</h3>
                </div>
                
                <div class="text-sm opacity-75">
                    {new Date().toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>
            
            <div class="space-y-3 overflow-y-auto">
                {#each todayMovies.slice(0, 5) as movie, index}
                <div 
                    class="flex items-center space-x-4 p-3 rounded-lg bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    in:fly="{{ x: -50, duration: 400, delay: 800 + (index * 100) }}"
                >
                    <img 
                        src="{movie.Img}" 
                        alt="{movie.Title}"
                        class="w-16 h-12 object-cover rounded"
                        loading="lazy"
                    />
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-medium truncate">{movie.Title}</h4>
                        <div class="flex flex-wrap gap-1 mt-1">
                            {#each movie.Categories.slice(0, 3) as category}
                                <span class="badge variant-soft-tertiary text-xs">{category}</span>
                            {/each}
                        </div>
                        <div class="text-xs opacity-60 mt-1">
                            {new Date(movie.createAt).toLocaleTimeString('th-TH')}
                        </div>
                    </div>
                </div>
                {/each}
                
                {#if todayMovies.length > 5}
                <div class="text-center pt-2">
                    <span class="text-sm opacity-75">และอีก {todayMovies.length - 5} รายการ...</span>
                </div>
                {/if}
            </div>
            
            <div class="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-tertiary-500/10 blur-xl"></div>
            <div class="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-tertiary-500/5 blur-lg"></div>
        </div>
        {/if}
    </div>
</div>
{/if}

<style>
    @keyframes heartbeat {
        0%, 50%, 100% {
            transform: scale(1);
        }
        25%, 75% {
            transform: scale(1.1);
        }
    }
</style>
