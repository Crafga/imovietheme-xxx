<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { storeTheme } from '$lib/stores/stores';
	import { enhance } from '$app/forms';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
	import { invalidateAll } from '$app/navigation';

	const toastStore = getToastStore();

    export let settings: any = []

	const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' }
	];

	const setTheme: SubmitFunction = async ({ formData }) => {
		const theme = formData.get('theme')?.toString();
		const id = formData.get('id')?.toString();
		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
			toastStore.trigger(await alertSuccess(`เปลี่ยน Theme ${theme} สำเร็จ`));
            await invalidateAll();
		}
	};
</script>

<div class="p-4">
	<section class="space-y-4 mb-4">
		<span class="badge variant-soft-primary translate-y-1">Theme ปัจจุบัน :  {$storeTheme}</span>
	</section>
	<div class="flex">
		<div class="space-y-4 gap-4">
			<form action="?/setTheme" method="POST" use:enhance={setTheme}>
                <input type="hidden" name="id" value={settings?.id ?? ''}>
				{#each themes as { icon, name, type }}
					<button
						class="btn h-full hover:variant-filled-surface"
						type="submit"
						name="theme"
						value={type}
						class:bg-primary-active-token={$storeTheme === type}
					>
						<span>{icon}</span>
						<span class="flex-auto text-left">{name}</span>
					</button>
				{/each}
			</form>
		</div>
	</div>
</div>
