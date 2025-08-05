<script lang="ts">
	import Icon from "@iconify/svelte";
    import { page } from '$app/stores';

    export let categories: any = []

</script>

<div class="w-64 hidden lg:block mt-10">
    <div class="sticky top-20">
        <!-- Categories Header -->
        <div class="card p-4 mb-6 rounded-lg">
            <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon icon="mdi:folder" class="text-xl" />
                Categories
            </h2>
            <div class="space-y-2 p-2">
                {#each categories as category}
                    <a
                        href="/categories/{category.name}"
                        class="w-full text-left p-1 rounded-lg transition-all duration-200 flex items-center gap-3 {$page.url.pathname === `/categories/${encodeURIComponent(category.name)}` ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'hover:bg-white/10'}"
                    >
                        <div class="flex-1 p-1">
                            <div class="font-medium">{category.name}</div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>