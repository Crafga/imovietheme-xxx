<script lang="ts">

    export let ads: any[] = [];

    $: T = ads?.filter((ad: any) => ad.position === 'T' && (!ad.expired || new Date(ad.expired) > new Date())) || [];
    $: TBL = ads?.filter((ad: any) => ad.position === 'TBL' && (!ad.expired || new Date(ad.expired) > new Date())) || [];
    $: TBR = ads?.filter((ad: any) => ad.position === 'TBR' && (!ad.expired || new Date(ad.expired) > new Date())) || [];
</script>

<div class="container mx-auto p-2 md:p-4">
    <div class="flex flex-row justify-center items-start gap-1 md:gap-4 overflow-x-auto">
        
        <!-- Left Vertical Ad -->
        <div class="flex-shrink-0">
            {#if TBL.length > 0}
                {#each TBL as ad}
                    <div class="bg-surface-200-700-token shadow-lg mb-2">
                        <a href={ad.url} target="_blank">
                            <div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
                                <img 
                                    src={ad.image} 
                                    alt={ad.title} 
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                    </div>
                {/each}
            {/if}
        </div>
        
        <!-- Center Horizontal Ad -->
        <div class="flex-1 min-w-0">
            {#if T.length > 0}
                {#each T as ad}
                    <div class="bg-surface-200-700-token shadow-lg mb-2">
                        <a href={ad.url} target="_blank">
                            <div class="w-full h-32 md:h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white text-center">
                                <img 
                                    src={ad.image} 
                                    alt={ad.title} 
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                    </div>
                {/each}
            {/if}
        </div>
        
        <!-- Right Vertical Ad -->
        <div class="flex-shrink-0">
            {#if TBR.length > 0}
                {#each TBR as ad}
                    <div class="bg-surface-200-700-token shadow-lg mb-2">
                        <a href={ad.url} target="_blank">
                            <div class="w-20 h-32 md:w-48 md:h-96 bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center font-bold text-center">
                                <img 
                                    src={ad.image} 
                                    alt={ad.title} 
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>