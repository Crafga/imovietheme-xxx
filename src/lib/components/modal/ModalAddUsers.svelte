<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import { getModalStore } from '@skeletonlabs/skeleton';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    let isDisable = false;

    let formData = {
		Username: '',
        password: '',
        role: 'ADMIN'
	};

    const onFormSubmit = async () => {
		isDisable = true;
		let response;
		if ($modalStore[0].response) {
			response = await fetch('?/addAdmins', {
				method: 'POST',
				body: JSON.stringify(formData)
			}).then(function (response) {
                return response.json();
            }).then(function (error) {
                return error;
            });
            $modalStore[0].response(response);
		}
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

        <label class="label">
            <span>Password</span>
            <input class="input rounded-lg" bind:value={formData.password}/>
        </label>

    </form>
    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn rounded-lg {parent.buttonNeutral}" disabled={isDisable} on:click={parent.onClose}>ยกเลิก</button>
        <button class="btn rounded-lg {parent.buttonPositive}" disabled={isDisable} on:click={onFormSubmit}>เพิ่มยูสเซอร์</button>
    </footer>
</div>
{/if}