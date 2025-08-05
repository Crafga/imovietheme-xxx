<script lang="ts">
	import { env } from "$env/dynamic/public";
	import Icon from '@iconify/svelte';
	import { initializeStores, Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
	// import { Turnstile } from 'svelte-turnstile';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	initializeStores();

	const toastStore = getToastStore();

	// export let siteKey: string

	let requestData = {
		username: '',
		password: '',
		otpToken: ''
	};

	let btnAction = false;
	let btnActionOtp = false;

	let otpRequired = false;
</script>

<Toast position="t"/>

<svelte:head>
	<title>{env.PUBLIC_APP_NAME} - Login</title>
</svelte:head>

<div class="container h-3/5 mx-auto flex justify-center items-center">
	<div class="space-y-10 flex flex-col items-center">
		<div class="shadow-lg drop-shadow-lg card p-4 flex gap-4 flex-col w-96">
			<h3 class="h3 text-center">เข้าสู่ระบบ</h3>
			{#if !otpRequired}
			<form method="POST" action="?/login"
			use:enhance={() => {
				btnAction = true;
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						btnAction = false;
						if (result.data?.message === 'กรอกรหัส 2FA') {
							otpRequired = true;
						}
						toastStore.trigger(await alertWrning(`${result.data?.message}`));
						update.apply(result);
						await invalidateAll();
						return;
					} else {
						btnAction = false;
						toastStore.trigger(await alertSuccess(`เข้าสู่ระบบสำเร็จ`));
						update.apply(result);
					}
				}
			}}
			>
				<div class="pb-4">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim"><Icon icon="clarity:user-solid" width="20" /></div>
						<input type="text" name="username" placeholder="ชื่อผู้ใช้" bind:value={requestData.username} />
					</div>
				</div>

				<div class="pb-4">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim"><Icon icon="mdi:password" width="20" /></div>
						<input type="password" name="password" placeholder="รหัสผ่าน" bind:value={requestData.password} />
					</div>
				</div>
				<!-- <div class="justify-items-center pb-4">
					<Turnstile siteKey="{siteKey}" theme="light" />
				</div> -->
				<div class="text-center">
					<button type="submit" class="btn variant-filled-success" disabled={btnAction}>
						{#if !btnAction}
							<Icon icon="ant-design:login-outlined" width="20" />&nbsp; เข้าสู่ระบบ
						{:else}
							<Icon icon="svg-spinners:tadpole" width="20" />&nbsp; เข้าสู่ระบบ
						{/if}
					</button>
				</div>
			</form>
			{:else}
			<form method="POST" action="?/otp"
			use:enhance={() => {
				btnActionOtp = true;
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						btnActionOtp = false;
						toastStore.trigger(await alertWrning(`${result.data?.message}`));
						update.apply(result);
						await invalidateAll();
						return;
					} else {
						btnActionOtp = false;
						otpRequired = true;
						toastStore.trigger(await alertSuccess(`เข้าสู่ระบบสำเร็จ`));
						update.apply(result);
					}
				}
			}}
			>
				<input type="hidden" name="username" placeholder="ชื่อผู้ใช้งาน" bind:value={requestData.username} />
				<div class="pb-4">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim"><Icon icon="carbon:two-factor-authentication" width="20" /></div>
						<input type="text" name="otp" placeholder="กรุณากรอกรหัส OTP" bind:value={requestData.otpToken} />
					</div>
				</div>
			</form>
			<div class="text-center">
				<button type="submit" class="btn variant-filled-success" disabled={btnActionOtp} >
					{#if !btnActionOtp}
					<Icon icon="arcticons:otp-authenticator" width="20" />&nbsp; ยืนยัน OTP
					{:else}
					<Icon icon="svg-spinners:tadpole" width="20" />&nbsp; ยืนยัน OTP
					{/if}
				</button>
			</div>
			{/if}
		</div>

	</div>
</div>

<style>
	button {
		color: #fff;
	}
</style>