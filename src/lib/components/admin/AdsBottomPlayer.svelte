<script lang="ts">

    export let ads: any[] = [];

    $: CH = ads?.filter((ad: any) => ad.position === 'CH' && (!ad.expired || new Date(ad.expired) > new Date())) || [];
    $: CBL = ads?.filter((ad: any) => ad.position === 'CBL' && (!ad.expired || new Date(ad.expired) > new Date())) || [];
    $: CBR = ads?.filter((ad: any) => ad.position === 'CBR' && (!ad.expired || new Date(ad.expired) > new Date())) || [];
</script>

<div class="container mx-auto p-2 md:p-4">
    <div class="flex flex-row justify-center items-start gap-1 md:gap-4 overflow-x-auto">
        
        <!-- Left Vertical Ad -->
        <div class="flex-shrink-0">
            {#if CBL.length > 0}
                {#each CBL as ad}
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
            {#if CH.length > 0}
                {#each CH as ad}
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
            {#if CBR.length > 0}
                {#each CBR as ad}
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