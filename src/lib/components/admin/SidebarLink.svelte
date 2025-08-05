<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	export let text = '';
	export let urlPath = '';
	export let icon = '';
</script>

<a href={urlPath} on:keypress on:click={drawerStore.close}>
	<li class="w-full pl-4 py-2 hover:bg-primary-200-700-token transition-all {$page.url.pathname.includes( urlPath ) ? 'bg-tertiary-active-token' : ''}">
		<Icon icon={icon} width="26" /> &nbsp; {text}
	</li>
</a>