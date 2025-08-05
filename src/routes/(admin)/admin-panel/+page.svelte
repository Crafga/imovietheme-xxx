<script lang="ts">
	import '../../../admin.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	// import type { PageData } from './$types';
	// export let data: PageData;
	
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	import Login from "$lib/components/admin/Login.svelte";

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

</script>

<svelte:head>
	<title>ADMIN - LOGIN</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/admin-panel">
					<strong class="text-xl">iMovie</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	
	<Login />

	<svelte:fragment slot="pageFooter">
		<div class="flex w-full bg-surface-200-700-token opacity-70 items-center justify-center py-1">
			Copyrighted 2023 by 
		</div>
	</svelte:fragment>
</AppShell>