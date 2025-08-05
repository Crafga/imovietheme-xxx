<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import  SidebarLink  from './SidebarLink.svelte';
</script>

<div class="h-full bg-surface-50-900-token border-r border-surface-500/30 transition-all w-56 overflow-hidden {$$props.class ?? ''}">
	<div class="p-4">
		<Accordion>
			<ul class="list pb-4">
				<SidebarLink text="Dashboard" icon="material-symbols:dashboard-outline" urlPath="/admin-panel/app/dashboard" />
			</ul>

			<ul class="list pb-4">
				<SidebarLink text="Admin" icon="heroicons:user-group" urlPath="/admin-panel/app/admin" />
			</ul>

			<ul class="list pb-4">
				<SidebarLink text="Ads Settings" icon="mdi:ads" urlPath="/admin-panel/app/ads-setting" />
			</ul>
			<ul class="list pb-4">
				<SidebarLink text="Web Settings" icon="mingcute:settings-6-fill" urlPath="/admin-panel/app/settings" />
			</ul>

		</Accordion>	
	</div>
</div>