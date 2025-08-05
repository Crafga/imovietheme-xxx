<script lang="ts">
    import type { PageData } from './$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import ThemeSetting from '$lib/components/admin/ThemeSetting.svelte';
    import SeoSetting from '$lib/components/admin/SeoSetting.svelte';
    import GeneralSetting from '$lib/components/admin/GeneralSetting.svelte';

    let tabSet: number = 0;

	export let data: PageData;
    // console.log(data)
</script>

<div class="container mx-auto lg:p-4">
	<div class="lg:p-10">
		<section class="space-y-4">
			<span class="badge variant-soft translate-y-1">Settings</span>
			<h3 class="h3">ตั้งค่าเว็บไซต์</h3>
		</section>

		<div class="card relative shadow-lg drop-shadow-xl w-full mt-4">
			<div class="p-4">
				<TabGroup>
					<Tab bind:group={tabSet} name="tab4" value={0}>Theme</Tab>
					<Tab bind:group={tabSet} name="tab1" value={1}>SEO</Tab>
					<Tab bind:group={tabSet} name="tab5" value={2}>ตั้งค่าทั่วไป</Tab>
					<!-- Tab Panels --->
					<svelte:fragment slot="panel">
						{#if tabSet === 0}
							<ThemeSetting settings={data.settings ?? null}/>
                        {:else if tabSet === 1}
                            <SeoSetting seo={data.settings ?? null}/>
                        {:else if tabSet === 2}
                            <GeneralSetting general={data.settings ?? null}/>
						{/if}
					</svelte:fragment>
				</TabGroup>
			</div>
		</div>
	</div>
</div>