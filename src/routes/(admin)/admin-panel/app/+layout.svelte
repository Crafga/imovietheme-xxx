<script lang="ts">
    import '../../../../admin.postcss'
	import type { LayoutData } from './$types';
    import { AppBar, AppShell, LightSwitch, popup, initializeStores, Toast, getDrawerStore, Modal, type PopupSettings, Avatar } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
	import Sidebar from '$lib/components/admin/Sidebar.svelte';

	initializeStores();
	const drawerStore = getDrawerStore();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    import { navigating } from '$app/stores';
    import NProgress from 'nprogress';
	import DrawerAll from '$lib/components/admin/DrawerAll.svelte';

	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; 
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import php from 'highlight.js/lib/languages/php';
	
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('php', php);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	const drawerOpen = (): void => {
		const s: DrawerSettings = { 
			id: 'sidenav',
			width: 'w-56'
		};
		drawerStore.open(s);
	}
	

	const popupPlacement: PopupSettings = {
		placement: 'bottom',
		event: 'click',
		target: 'popupClick'
	};

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

    export let data: LayoutData;
</script>

<svelte:head>
	<title>ADMIN - Panel</title>
	<link rel="icon" href={data.set?.favicon ?? '/player.png'} />
</svelte:head>

<Toast position="t"/>
<Modal />
<DrawerAll />

<div class="card p-4 w-56 shadow-xl z-40" data-popup="popupClick">
	<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
		<ul class="list">
			<li>
				<a href="/admin-panel/app/profile/change-password" class="flex items-center gap-2 hover:bg-primary-hover-token rounded-lg ">
					<Icon icon="mdi:password-outline" class="inline-block" />เปลี่ยนรหัสผ่าน
				</a>
			</li>
			<li>
				<a href="/admin-panel/app/profile/two-factor" class="flex items-center gap-2 hover:bg-primary-hover-token rounded-lg ">
					<Icon icon="carbon:two-factor-authentication" class="inline-block" /> ตั้งค่า 2FA
				</a>
			</li>
			<li>
				<a href="/admin-panel/logout" class="flex items-center gap-2 hover:bg-primary-hover-token rounded-lg">
					<Icon icon="carbon:logout" class="inline-block" /> ออกจากระบบ
				</a>
			</li>
		</ul>
		<div class="arrow variant-filled-surface" />
	</nav>
</div>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotTrail="!space-x-2">

			<svelte:fragment slot="lead">
				<div class="flex items-center space-x-4">
					<button on:click={drawerOpen} class="btn-icon btn-icon-sm lg:!hidden">
						<Icon icon="uil:bars" width="30" />
					</button>
					<a href="/admin-panel/app/dashboard">
						<strong class="text-xl uppercase">iMovie</strong>
					</a>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
				<div use:popup={popupPlacement} class="hover:cursor-pointer flex flex-row items-center gap-3 hover:bg-primary-hover-token rounded-full p-2">
					<Avatar initials={data.user?.username ?? ''} background="bg-primary-500" width="w-10" />
					<span>{data.user?.username}</span>
				</div>
				
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Sidebar user={data.user} class="hidden lg:grid overflow-hidden"/>
	</svelte:fragment>
	
	<slot />
	
	<svelte:fragment slot="pageFooter">
		<div class="flex w-full bg-surface-200-700-token opacity-70 items-center justify-center py-1">
			Copyrighted 2023 by iMovie
		</div>
	</svelte:fragment>
</AppShell>