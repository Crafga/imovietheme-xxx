<script lang="ts">
    import type { PageData } from './$types';
    import Icon from '@iconify/svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
    import { invalidateAll } from '$app/navigation';
    
    const toastStore = getToastStore();

    export let data: PageData;

    let btnAction = false;
	let btnDisable = false;

    const formDataInput = {
		id: data.user?.id,
		UserName: data.user?.username,
		newpassword: '',
		confpassword: '',
	}

    const updateData = async () => {
        btnAction = true;
        btnDisable = true;

        if (formDataInput.newpassword !== formDataInput.confpassword) {
            toastStore.trigger(await alertWrning('Password ไม่ตรงกัน'));
            btnAction = false;
            btnDisable = false;
            return;
        }
        const res = await fetch('/api/admin/profile/change-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formDataInput)
		});

        const resJSON = await res.json();

		if (resJSON.status === 200) {
			btnAction = false;
			btnDisable = false;
			
			toastStore.trigger(await alertSuccess(resJSON.message));
            await invalidateAll()
		} else {
			btnAction = false;
			btnDisable = false;
			toastStore.trigger(await alertError(resJSON.message));
			return;
		}
        
    }
</script>

<div class="p-10">
    <div class="container card mx-auto p-4 shadow-lg">
        <section class="space-y-4">
            <span class="badge variant-soft translate-y-1">Profile</span>
            <h3 class="h3">Change Password</h3>
        </section>
    
        <div class="grid grid-cols-1 p-5">
            <div class="p-6 gap-4 flex-col mr-2 ">
                <div class="grid grid-cols-3 gap-4">
                    <label class="label">
                        <span>Username</span>
                        <input class="input variant-form-material" type="text" placeholder="Username" bind:value={formDataInput.UserName} disabled/>
                    </label>
                </div>
    
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <label class="label">
                        <span>New Password</span>
                        <input class="input variant-form-material" type="text" placeholder="New Password" bind:value={formDataInput.newpassword}/>
                    </label>
                    <label class="label">
                        <span>Confrim Password</span>
                        <input class="input variant-form-material" type="text" placeholder="Confrim Password" bind:value={formDataInput.confpassword}/>
                    </label>
                </div>
    
                <div class="mt-4">
                    <button type="button" class="btn variant-filled-primary" on:click={updateData} disabled={btnDisable}>
                        {#if !btnAction}
                        <Icon icon="fluent:save-arrow-right-20-regular" width="20" />&nbsp; บันทึก
                        {:else}
                        <Icon icon="svg-spinners:tadpole" width="20" />&nbsp; บันทึก
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>