<script lang="ts">
    import Icon from "@iconify/svelte";
	import { page } from '$app/stores';

    export let categories: any = []

</script>

<!-- Mobile Categories (Bottom Sheet Style) -->
<div class="lg:hidden fixed bottom-0 left-0 right-0 z-40">
	<div class="bg-surface-900 border-t border-white/10 p-4">
		<div class="flex space-x-2 overflow-x-auto pb-2">
			{#each categories as category}
				<a
					href="/categories/{category.name}"
					class="flex-shrink-0 px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 {$page.url.pathname === `/categories/${encodeURIComponent(category.name)}` ? 'bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg' : 'glass border border-white/20'}"
				>
					<span class="text-sm font-medium">{category.name}</span>
				</a>
			{/each}
		</div>
	</div>
</div>