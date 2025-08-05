<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
	import { invalidateAll } from '$app/navigation';
	const toastStore = getToastStore();

	export let seo: any = [];

	let btnAction = false;

	let formData = {
		id: seo?.id ?? '',
		title: seo?.title ?? '',
		webname: seo?.webname ?? '',
		keyword: seo?.keyword ?? '',
		description: seo?.description ?? '',
		footerText: seo?.footerText ?? '',
	};

	const updateData = async () => {
		btnAction = true;

		const req = await fetch('?/seoSetting', {
			method: 'POST',
			body: JSON.stringify(formData)
		});

		const resJSON = await req.json();
		if (resJSON.type === "success") {
			btnAction = false;

			toastStore.trigger(await alertSuccess(`แก้ไขข้อมูล Seo สำเร็จ`));
			await invalidateAll();
		} else {
			btnAction = false;
			toastStore.trigger(await alertError(`เกิดข้อผิดพลาด`));
			return;
		}
	};
</script>

<div class="p-4">
	<section class="space-y-4">
		<span class="badge variant-soft-primary translate-y-1">ตั้งค่า Seo</span>
	</section>

	<div class="grid grid-cols-2 gap-4 mt-4">
		<label class="label">
			<span>Title :</span>
			<input
				class="input variant-form-material"
				type="text"
				placeholder="Title"
				bind:value={formData.title}
			/>
		</label>
		<label class="label">
			<span>Web Name :</span>
			<input
				class="input variant-form-material"
				type="text"
				placeholder="Web Name"
				bind:value={formData.webname}
			/>
		</label>
		<label class="label">
			<span>Keyword :</span>
			<input
				class="input variant-form-material"
				type="text"
				placeholder="Keyword"
				bind:value={formData.keyword}
			/>
		</label>
	</div>
	<div class="grid grid-cols-1 gap-4 mt-4">
		<label class="label">
			<span>Description :</span>
			<textarea
				class="input variant-form-material"
				rows="4"
				placeholder="Description"
				bind:value={formData.description}
			/>
		</label>
	</div>
	<div class="grid grid-cols-1 gap-4 mt-4">
		<label class="label">
			<span>Footer Text :</span>
			<textarea
				class="input variant-form-material"
				rows="4"
				placeholder="Description"
				bind:value={formData.footerText}
			/>
		</label>
	</div>

	<div class="mt-4">
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={updateData}
			disabled={btnAction}
		>
			{#if !btnAction}
				<Icon icon="fluent:save-arrow-right-20-regular" width="20" />&nbsp; บันทึก
			{:else}
				<Icon icon="svg-spinners:tadpole" width="20" />&nbsp; บันทึก
			{/if}
		</button>
	</div>
</div>
