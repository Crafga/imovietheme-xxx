<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import { getModalStore } from '@skeletonlabs/skeleton';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const user = $modalStore[0].meta.user;
    let isDisable = false;

    let formData = {
        id: user.id,
		Username: user.username,
        role: "ADMIN",
        status: user.status
	};

    const onFormSubmit = async () => {
		isDisable = true;
        if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

    // Base Classes
	const cBase = 'card p-4 w-modal-slim shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-300 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
<div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    <article>{$modalStore[0].body ?? '(body missing)'}</article>
    <!-- Enable for debugging: -->
    <form class="modal-form {cForm}">
        <label class="label">
            <span>UserName</span>
            <input class="input rounded-lg" bind:value={formData.Username}/>
        </label>
        <!-- <label class="label">
            <span>ROLE</span>
            <select class="select" bind:value={formData.role}>
                <option value='ADMIN'>ADMIN</option>
                <option value='USER'>USER</option>
            </select>
        </label> -->
        <label class="label">
            <span>Status</span>
            <select class="select" bind:value={formData.status}>
                <option value={true}>ACTIVE</option>
                <option value={false}>BANNED</option>
            </select>
        </label>
    </form>
    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn rounded-lg {parent.buttonNeutral}" disabled={isDisable} on:click={parent.onClose}>ยกเลิก</button>
        <button class="btn rounded-lg {parent.buttonPositive}" disabled={isDisable} on:click={onFormSubmit}>แก้ไขยูสเซอร์</button>
    </footer>
</div>
{/if}