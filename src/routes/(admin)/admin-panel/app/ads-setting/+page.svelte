<script lang="ts">
    import type { PageData } from './$types';
    import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
	import { invalidateAll } from '$app/navigation';

	const toastStore = getToastStore();

    export let data: PageData;

    let formData = {
        id: '',
        title: '',
        url: '',
        position: '',
        desc: '',
        expired: '',
        adsFile: ''
    }

    let btnAction = false;
    let adsFile: File | null = null;

    const handleAdsChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			adsFile = target.files[0];
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

    const updateFormData = (value: any) => {
		formData.id = value?.id ?? '';
		formData.title = value?.title ?? '';
		formData.url = value?.url ?? '';
		formData.position = value?.position ?? '';
		formData.desc = value?.sortBy ?? '';
		formData.expired = value?.expired ? new Date(value.expired).toISOString().split('T')[0] : '';
		formData.adsFile = value?.image ?? '';
	}
	
    const createAds = async () => {
		btnAction = true;
        if (!formData.title && !formData.url && !formData.desc && !formData.position && !formData.expired) {
            btnAction = false;
            toastStore.trigger(await alertWrning('กรอกข้อทมูลให้ครบ'));
            return;
        }

		try {
			// Convert files to base64 if selected
			if (adsFile) {
				formData.adsFile = await convertFileToBase64(adsFile);
			}

			const res = await fetch('/api/admin/ads-setting', {
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
				formData.id = '';
                formData.title = '';
                formData.url = '';
                formData.position = '';
                formData.desc = '';
                formData.expired = '';
                formData.adsFile = '';
                adsFile = null
				await invalidateAll();
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

    const positions = Array.from({ length: 26 }, (_, i) =>
		String.fromCharCode('A'.charCodeAt(0) + i)
	);

    let searchInput = '';

    // Pagination state
	let currentPage = 1;
	const itemsPerPage = 10;
	$: totalPages = Math.ceil((data?.adsData?.length ?? 0) / itemsPerPage);
	$: paginatedData = (data?.adsData ?? []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	};

    const nextPage = () => goToPage(currentPage + 1);
	const prevPage = () => goToPage(currentPage - 1);

    const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			currentPage = 1;
			paginatedData = (data?.adsData ?? []).filter(
				item => item.title?.includes(searchInput) || item.url?.includes(searchInput)
			);
		}
	}

    const showPositions = (position: string) => {
        if (position === 'A') return 'A - ด้านบนกลาง';
        else if (position === 'BL') return 'BL - ด้านบนซ้าย';
        else if (position === 'BR') return 'BR - ด้านบนขวา';
        else if (position === 'CH') return 'CH - ด้านล่างตัวเล่นวีดีโอ (กลาง)';
        else if (position === 'CBL') return 'CBL - ด้านล่างตัวเล่นวีดีโอ (ซ้าย)';
        else if (position === 'CBR') return 'CBR - ด้านล่างตัวเล่นวีดีโอ (ขวา)';
        else if (position === 'T') return 'T - ด้านล่าง Tag (กลาง)';
        else if (position === 'TBL') return 'TBL - ด้านล่าง Tag (ซ้าย)';
        else if (position === 'TBR') return 'TBR - ด้านล่าง Tag (ขวา)';
        else if (position === 'L') return 'L - ป้ายลอยด้านซ้าย (แสดงผลทุกหน้า)';
        else if (position === 'R') return 'R - ป้ายลอยด้านขวา (แสดงผลทุกหน้า)';
        else if (position === 'FT') return 'FT - ป้ายลอยกลางล่าง Footer (แสดงผลทุกหน้า)';
        else return ''
    }
</script>

<div class="container mx-auto lg:p-4">
    <div class="lg:p-10">
        <section class="space-y-4">
			<span class="badge variant-soft translate-y-1">Ads Settings</span>
			<h3 class="h3">ตั้งค่าป้ายโฆษณา</h3>
		</section>
    </div>

    <div class="card relative shadow-lg drop-shadow-xl w-full mt-4">
        <div class="grid grid-cols-4 p-4 gap-4">
            <div class="space-y-2">
                <label class="label">
                    <span class="font-medium">Title :</span>
                    <input class="input variant-form-material" type="text" bind:value={formData.title}/>
                </label>
            </div>
            <div class="space-y-2">
                <label class="label">
                    <span class="font-medium">URL :</span>
                    <input class="input variant-form-material" type="text" bind:value={formData.url}/>
                </label>
            </div>
            <div class="space-y-2">
                <label class="label">
                    <span class="font-medium">ตำแหน่ง :</span>
                    <select class="select variant-form-material" bind:value={formData.position}>
                        <option value=''>เลือกตำแหน่ง</option>
                        <option value="A">A - ด้านบนกลาง</option>
                        <option value="BL">BL - ด้านบนซ้าย</option>
                        <option value="BR">BR - ด้านบนขวา</option>
                        <option value="CH">CH - ด้านล่างตัวเล่นวีดีโอ (กลาง)</option>
                        <option value="CBL">CBL - ด้านล่างตัวเล่นวีดีโอ (ซ้าย)</option>
                        <option value="CBR">CBR - ด้านล่างตัวเล่นวีดีโอ (ขวา)</option>
                        <option value="T">T - ด้านล่าง Tag (กลาง)</option>
                        <option value="TBL">TBL - ด้านล่าง Tag (ซ้าย)</option>
                        <option value="TBR">TBR - ด้านล่าง Tag (ขวา)</option>
                        <option value="L">L - ป้ายลอยด้านซ้าย (แสดงผลทุกหน้า)</option>
                        <option value="R">R - ป้ายลอยด้านขวา (แสดงผลทุกหน้า)</option>
                        <option value="FT">FT - ป้ายลอยกลางล่าง Footer (แสดงผลทุกหน้า)</option>
                    </select>
                </label>
            </div>
            <div class="space-y-2">
                <label class="label">
                    <span class="font-medium">ลำดับ : <small class="text-rose-500">(A คือล่างสุด)</small></span>
                    <select class="select variant-form-material" bind:value={formData.desc}>
                        <option value=''>เลือกลำดับ</option>
                        {#each positions as val}
                            <option value={val}>{val}</option>
                        {/each}
                    </select>
                </label>
            </div>

            <div class="space-y-2">
                <label class="label">
                    <span class="font-medium">Ads Image</span>
                    <input class="input variant-form-material" type="file" accept="image/*" on:change={handleAdsChange} />
                </label>
                {#if adsFile}
                    <div class="card p-4 mt-2">
                        <div class="flex items-center space-x-4">
                            <img
                                src={URL.createObjectURL(adsFile)}
                                alt="Logo Preview"
                                class="w-32 object-contain rounded"
                            />
                            <div>
                                <p class="text-sm font-medium">ตัวอย่าง Ads ใหม่</p>
                                <p class="text-xs">ไฟล์: {adsFile.name}</p>
                                <p class="text-xs">ขนาด: {(adsFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                        </div>
                    </div>
                {:else if formData.adsFile}
                    <div class="card p-4 mt-2">
                        <div class="flex items-center space-x-4">
                            <img src={formData.adsFile} alt="Current Logo" class="w-20 h-20 object-contain rounded" />
                            <div>
                                <p class="text-sm font-medium">Ads ปัจจุบัน</p>
                                <p class="text-xs">Path: {formData.adsFile}</p>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            <div class="space-y-2">
                <label class="label">
                    <span class="font-medium">หมดอายุแสดงผลป้ายโฆษณา :</span>
                    <input class="input variant-form-material" type="date" bind:value={formData.expired}/>
                </label>
            </div>
        </div>
        <div class="p-4">
            <button
                type="button"
                class="btn btn-sm rounded-md variant-filled-success"
                on:click={createAds}
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
</div>

<div class="container mx-auto lg:p-4">
    <div class="card relative shadow-lg drop-shadow-xl w-full p-4">
        <div class="flex justify-between items-center p-4">
            <div class="flex m-4">
                <label for="">
                    <input
                        class="input rounded-lg variant-form-material"
                        type="text"
                        placeholder="ค้นหา Title หรือ Url ... Enter"
                        bind:value={searchInput}
                        on:keydown={handleKeyPress}
                    />
                </label>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-sm opacity-75">
                    แสดง
                    {#if data?.adsData}
                        {((currentPage - 1) * itemsPerPage) + 1}
                        -
                        {Math.min(currentPage * itemsPerPage, data.adsData.length)}
                        จาก {data.adsData.length} งวด
                    {:else}
                        -
                    {/if}
                </span>
                <div class="flex items-center gap-2">
                    <button 
                        class="btn btn-sm variant-ghost-surface" 
                        disabled={currentPage === 1}
                        on:click={prevPage}
                    >
                        ← ก่อนหน้า
                    </button>
                    <span class="text-sm px-3 py-1 bg-surface-500 rounded">
                        {currentPage} / {totalPages}
                    </span>
                    <button 
                        class="btn btn-sm variant-ghost-surface" 
                        disabled={currentPage === totalPages}
                        on:click={nextPage}
                    >
                        ถัดไป →
                    </button>
                  </div>
            </div>
        </div>


        <div class="table-container mt-4">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="text-center">Image</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Url</th>
                        <th class="text-center">ตำแหน่ง</th>
                        <th class="text-center">ลำดับ</th>
                        <th class="text-center">หมดอายุ</th>
                        <th class="text-center">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {#each paginatedData as v}
                    <tr>
                        <td class="text-center">
                            <img src={v.image} alt="img ads" width="100">
                        </td>
                        <td class="text-center">
                            {v.title}
                        </td>
                        <td class="text-center">
                            <span class="badge variant-filled-success">{v.url}</span>
                        </td>
                        <td class="text-center">
                            <span class="badge variant-filled-tertiary">{showPositions(v.position ?? '')}</span>
                        </td>
                        <td class="text-center">
                            <span class="badge variant-filled-primary">{v.sortBy}</span>
                        </td>
                        <td class="text-center">
                            {#if v.expired}
                                {new Date(v.expired).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            {:else}
                                -
                            {/if}
                        </td>
                        <td class="text-center">
                            <button type="button" class="btn btn-sm variant-filled-warning" on:click={() => updateFormData(v)}>
                                <Icon icon="carbon:edit" width="20"/>
                            </button>
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="flex justify-center items-center gap-2 p-4">
            <button 
              class="btn btn-sm variant-filled-surface" 
              disabled={currentPage === 1}
              on:click={prevPage}
            >
              ← ก่อนหน้า
            </button>
            
            {#each Array.from({length: Math.min(5, totalPages)}, (_, i) => {
              const startPage = Math.max(1, currentPage - 2);
              return startPage + i;
            }) as page}
              {#if page <= totalPages}
                <button 
                  class="btn btn-sm {page === currentPage ? 'variant-filled-primary' : 'variant-ghost-surface'}"
                  on:click={() => goToPage(page)}
                >
                  {page}
                </button>
              {/if}
            {/each}
            
            <button 
              class="btn btn-sm variant-filled-surface" 
              disabled={currentPage === totalPages}
              on:click={nextPage}
            >
              ถัดไป →
            </button>
        </div>
    </div>
</div>