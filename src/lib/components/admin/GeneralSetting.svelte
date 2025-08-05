<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess } from '$lib/utils/alerts';
	const toastStore = getToastStore();

	export let general: any = [];

	let btnAction = false;

	let logoFile: File | null = null;
	let faviconFile: File | null = null;

	let formData = {
		id: general?.id ?? '',
		logo: '',
		favicon: ''
	};

	// อัปเดตข้อมูลเมื่อ component mount หรือ value เปลี่ยน
	$: if (general && general.length > 0) {
		updateFormData();
	}

	function updateFormData() {
		formData.logo = general.logo ?? '';
		formData.favicon = general.favicon ?? '';
	}


	const handleLogoChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			logoFile = target.files[0];
		}
	};

	const handleFaviconChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			faviconFile = target.files[0];
		}
	};

	const convertFileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const updatePay = async () => {
		btnAction = true;

		try {
			// Convert files to base64 if selected
			if (logoFile) {
				formData.logo = await convertFileToBase64(logoFile);
			}
			if (faviconFile) {
				formData.favicon = await convertFileToBase64(faviconFile);
			}

			const res = await fetch('/api/admin/settings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const resJSON = await res.json();
			if (resJSON.status === 200) {
				btnAction = false;
				toastStore.trigger(await alertSuccess(resJSON.message));
				
				// Force reload the page to clear any cached images
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				btnAction = false;
				toastStore.trigger(await alertError(resJSON.message));
				return;
			}
		} catch (error) {
			btnAction = false;
			toastStore.trigger(await alertError('เกิดข้อผิดพลาดในการบันทึกข้อมูล'));
		}
	};
</script>

<div class="p-4">
	<section class="space-y-4">
		<span class="badge variant-soft-primary translate-y-1">ตั้งค่าทั่วไป</span>
	</section>

	<hr class="!border-dashed !border-t-2 mt-4 mb-4" />

	<div class="space-y-2">
		<label class="label">
			<span class="font-medium">Logo</span>
			<input class="input" type="file" accept="image/*" on:change={handleLogoChange} />
		</label>
		{#if logoFile}
			<div class="card p-4 mt-2">
				<div class="flex items-center space-x-4">
					<img
						src={URL.createObjectURL(logoFile)}
						alt="Logo Preview"
						class="w-20 h-20 object-contain rounded"
					/>
					<div>
						<p class="text-sm font-medium">ตัวอย่างโลโก้ใหม่</p>
						<p class="text-xs text-surface-500">ไฟล์: {logoFile.name}</p>
						<p class="text-xs text-surface-300">ขนาด: {(logoFile.size / 1024).toFixed(1)} KB</p>
					</div>
				</div>
			</div>
		{:else if formData.logo}
			<div class="card p-4 mt-2">
				<div class="flex items-center space-x-4">
					<img src={formData.logo} alt="Current Logo" class="w-20 h-20 object-contain rounded" />
					<div>
						<p class="text-sm font-medium">โลโก้ปัจจุบัน</p>
						<p class="text-xs text-surface-300">Path: {formData.logo}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="space-y-2">
		<label class="label">
			<span class="font-medium">Favicon</span>
			<input class="input" type="file" accept="image/*" on:change={handleFaviconChange} />
		</label>
		{#if faviconFile}
			<div class="card p-4 mt-2">
				<div class="flex items-center space-x-4">
					<img
						src={URL.createObjectURL(faviconFile)}
						alt="Favicon Preview"
						class="w-8 h-8 object-contain rounded"
					/>
					<div>
						<p class="text-sm font-medium">ตัวอย่าง Favicon ใหม่</p>
						<p class="text-xs text-surface-500">ไฟล์: {faviconFile.name}</p>
						<p class="text-xs text-surface-300">ขนาด: {(faviconFile.size / 1024).toFixed(1)} KB</p>
					</div>
				</div>
			</div>
		{:else if formData.favicon}
			<div class="card p-4 mt-2">
				<div class="flex items-center space-x-4">
					<img
						src={formData.favicon}
						alt="Current Favicon"
						class="w-8 h-8 object-contain rounded"
					/>
					<div>
						<p class="text-sm font-medium">Favicon ปัจจุบัน</p>
						<p class="text-xs text-surface-300">Path: {formData.favicon}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="mt-4">
		<button
			type="button"
			class="btn btn-sm rounded-md variant-filled-primary"
			on:click={updatePay}
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
