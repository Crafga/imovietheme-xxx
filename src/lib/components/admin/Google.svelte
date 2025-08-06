<script lang="ts">
    import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess } from '$lib/utils/alerts';
	import { invalidateAll } from '$app/navigation';
	const toastStore = getToastStore();

    export let google: any = [];

    let btnAction = false;

    let formData = {
		id: google?.id ?? '',
		gTag: google?.googleTag ?? '',
		googleSiteVerify: google?.googleSiteVerify ?? ''
	};

    const updateGoogle = async () => {
        btnAction = true;

		const req = await fetch('?/googleSetting', {
			method: 'POST',
			body: JSON.stringify(formData)
		});

		const resJSON = await req.json();
		if (resJSON.type === "success") {
			btnAction = false;

			toastStore.trigger(await alertSuccess(`แก้ไขข้อมูล Google สำเร็จ`));
			await invalidateAll();
		} else {
			btnAction = false;
			toastStore.trigger(await alertError(`เกิดข้อผิดพลาด`));
			return;
		}
    }
</script>

<div class="p-4">
    <section class="space-y-4">
		<span class="badge variant-soft-primary translate-y-1">ตั้งค่า Google Analytics</span>
	</section>

    <hr class="!border-dashed !border-t-2 mt-4 mb-4" />

    <div class="space-y-2 mb-4">
        <label class="label">
			<span class="font-medium">Google Tag</span>
			<input class="input variant-form-material" placeholder="G-HGPVTG5CRG" type="text" bind:value={formData.gTag} />
		</label>
    </div>

    <div class="space-y-2 mb-4">
        <label class="label">
			<span class="font-medium">Google Site Verification <small class="text-rose-500"><a href="https://help.readyplanet.com/4871/google-verification-%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%A2%E0%B8%B7%E0%B8%99%E0%B8%A2%E0%B8%B1%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B2%E0%B8%87-google" target="_blank">*ตัวอย่าง</a></small></span>
			<input class="input variant-form-material" placeholder="Gog9591D_R978slKAVfuqCs3i36ko9wcv6-_nB0Ca-A" type="text" bind:value={formData.googleSiteVerify} />
		</label>
    </div>

    <div class="mt-4">
		<button
			type="button"
			class="btn btn-sm rounded-md variant-filled-primary"
			on:click={updateGoogle}
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