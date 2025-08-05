<script lang="ts">
	import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
	import Sidebar from './Sidebar.svelte';

	const drawerStore = getDrawerStore();

	$: classesDrawer = $drawerStore.id === 'sidenav' ? 'lg:hidden' : '';
</script>

<Drawer class={classesDrawer}>
	{#if $drawerStore.id === 'sidenav'}
		<Sidebar />
	{/if}
</Drawer>
