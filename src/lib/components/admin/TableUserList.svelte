<script lang="ts">
    import Icon from "@iconify/svelte";
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
    import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
    import ModalAddUser from '$lib/components/modal/ModalAddUsers.svelte';
    import ModalEditUsers from '$lib/components/modal/ModalEditUsers.svelte';
    import { invalidateAll } from '$app/navigation';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    export let userList: any[] = [];

    const modalAddUsers = (): void => {
        const c: ModalComponent = { ref: ModalAddUser };
        const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'เพิ่มยูสเซอร์',
			body: ' ',
			response: async (response) => {
                if(response) {
					if (response.success || response.status === 200) {
                        toastStore.trigger(await alertSuccess('สร้างยูสเซอร์ใหม่สำเร็จ'));
					} else {
                        toastStore.trigger(await alertError('ไม่สามารถสร้างยูสเซอร์ได้'));
					}
					await invalidateAll();
				}
			}
		};
		modalStore.trigger(modal);
    }

    const modalEditUser = async (user:any) => {
        const c: ModalComponent = { ref: ModalEditUsers };
        const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'แก้ไขข้อมูลยูสเซอร์',
			body: ' ',
			meta: { user: user },
			response: async (response) => {
				if(response) {
					const request = await fetch('?/editAdmin', {
						method: 'POST',
						body: JSON.stringify(response)
					});
					if (request.ok) {
                        toastStore.trigger(await alertSuccess('อัพเดทยูสเซอร์สำเร็จ'));
					} else {
                        toastStore.trigger(await alertError('ไม่สามารถอัพเดทยูสเซอร์ได้'));
					}
					await invalidateAll();
				}
			}
		};
		modalStore.trigger(modal);
    }
</script>

<div class="p-10">
	<section class="space-y-4">
		<span class="badge variant-soft translate-y-1">Users</span>
		<h3 class="h3">Users List</h3>
    </section>

    <div class="grid grid-cols-1 sm:grid-cols-1 my-6 gap-4">
        <div class="card relative shadow-lg drop-shadow-xl w-full">
            <div class="p-4">
                <button type="button" class="btn btn-sm variant-filled-success" on:click={modalAddUsers}>
                    <Icon icon="flowbite:user-add-outline" width="20" /> Add User
                </button>
                <div class="table-container mt-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="text-center">Username</th>
                                <th class="text-center">สิทธิ์</th>
                                <th class="text-center">สถานะ</th>
                                <th class="text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each userList as value}
                            <tr>
                                <td class="text-center">{value.username}</td>
                                <td class="text-center">
                                    {#if value.role === 'ADMIN'}
                                        <span class="badge variant-filled-primary">Admin</span>
                                    {:else}
                                        <span class="badge variant-filled-warning">User</span>
                                    {/if}
                                </td>
                                <td class="text-center">
                                    {#if value.status}
                                        <span class="badge variant-filled-primary">Active</span>
                                    {:else}
                                        <span class="badge variant-filled-error">Banned</span>
                                    {/if}
                                </td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-sm variant-filled-warning" on:click={() => {modalEditUser(value);}}>
                                        <Icon icon="carbon:edit" width="20"/>
                                    </button>
                                </td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>