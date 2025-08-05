<script lang="ts">
	import type { PageData } from './$types';
	import QRCode from 'qrcode';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { alertError, alertSuccess, alertWrning } from '$lib/utils/alerts';
    const toastStore = getToastStore();

	let qrPageUrlDataUrl = '';

	export let data: PageData;

	let step = 0;
	let otpToken = '';

	onMount(async () => {
		qrPageUrlDataUrl = await QRCode.toDataURL(data.otpSecretUri ?? '');
	});

	const save2FA = async () => {
		if (otpToken === '') {
			toastStore.trigger(await alertError(`กรุณากรอกรหัสยืนยัน`));
			return
		}
		const req = await fetch('/api/admin/profile/2fa/save2fa', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				otpToken,
				otpSecret: data.otpSecret
			})
		});
        const resp = await req.json();
        if (resp.respAlert.success) {
            step = 0;
			otpToken = '';
            toastStore.trigger(await alertSuccess(`${resp.respAlert.data}`));
            await invalidateAll();
        } else {
            toastStore.trigger(await alertError(`${resp.respAlert.error}`));
        }
	}

	const cancel2FA = async () => {
		if (otpToken === '') {
			toastStore.trigger(await alertError(`กรุณากรอกรหัสยืนยัน`));
			return
		}
		const req = await fetch('/api/admin/profile/2fa/cancel2fa', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				otpToken
			})
		});

        const resp = await req.json();

        if (resp.respAlert.success) {
            step = 0;
			otpToken = '';
            toastStore.trigger(await alertSuccess(`${resp.respAlert.data}`));
            await invalidateAll();
        } else {
            toastStore.trigger(await alertError(`${resp.respAlert.error}`));
        }
	}
</script>

<div class="p-10">
	<div class="container card mx-auto p-4 shadow-lg">
		<section class="space-y-4 mb-2">
			<span class="badge variant-soft translate-y-1">โปรไฟล์</span>
			<h3 class="h3">ตั้งค่าความปลอดภัยสองชั้น 2FA</h3>
		</section>
		<div class="space-y-10 flex flex-col ">
			<div class="p-6 flex gap-4 flex-col">
				<p class="h5">
					Two-Factor Authentication หรือที่เรียกย่อ ๆ ว่า 2FA หรือ TFA คือ การยืนยัน 2 ขั้นตอน
					เพื่อเพิ่มความปลอดภัยที่เรียกว่า "การตรวจสอบหลายปัจจัย" สำหรับการเข้าถึงข้อมูล
					โดยผู้ลงชื่อเข้าใช้จำเป็นต้องใช้มากกว่า ยูสเซอร์ และ รหัสผ่าน เช่น ข้อมูลเฉพาะ
					ที่จะมีเพียงเจ้าของบัญชีเท่านั้นที่ทราบ เช่น รหัสผ่านพิเศษที่จะเปลี่ยนเองทุกนาที เป็นต้น
					ในการเปิด 2FA การยืนยันตนเองสองขั้นตอนนี้ จะช่วยเพิ่มระดับความปลอดภัยขั้นที่ 2
					ให้กับบัญชีของท่านเวลา ล็อกอิน ระบบนี้จะช่วยป้องกันบัญชีของท่านจากคนอื่น ๆ ที่มี
					รหัสผ่านของท่าน
				</p>
				<br />
				<span class="h5">
					Google Authenticator (หรือแอปพลิเคชันอื่น ๆ ที่ท่านอาจเลือกใช้) จะแสดงรหัสผ่าน 6 หลัก
					ซึ่งจะถูกเปลี่ยนใหม่ทุก ๆ 30 วินาที โดยใช้ระบบ Time-based One-Time Password algorithm (TOTP)
					และ HMAC-based One-Time Password algorithm (HOTP)
					เพื่อเพิ่มความปลอดภัยให้กับบัญชีและสินทรัพย์ของท่าน *หากติดตั้ง 2FA แล้ว
					ท่านไม่ควรลบแอปพลิเคชัน Google Authenticator โดยไม่จำเป็น ไม่เช่นนั้น รหัส 2FA อาจสูญหาย
				</span>
				<div class="grid grid-cols-2 gap-2 ">
					{#if !data.isEnableOTP}
						{#if step == 0}
							<div class="space-y-10 flex flex-col ">
								<div class="shadow-lg drop-shadow-lg card p-6 flex gap-4 flex-col">
									<span class="h5">ขั้นที่ 1</span>
									<p class="h6">เริ่มต้นการเปิดใช้งาน 2FA</p>
									<button class="btn variant-filled-primary" on:click={() => (step = 1)}
										>เริ่มต้นการเปิดใช้งาน</button
									>
								</div>
							</div>
						{/if}
						{#if step == 1}
							<div class="space-y-10 flex flex-col">
								<div class="shadow-lg drop-shadow-lg card p-6 flex gap-4 flex-col">
									<h3>ขั้นที่ 2</h3>
									<h2>
										กรุณาแสกน QR Code ด้านล่าง ด้วย Google Authenticator หรือแอปพลิเคชันอื่น ๆ
										หรือหากแสกนไม่ได้ กรุณากรอกรหัสด้านล่าง
									</h2>
									<div class="flex justify-center">
										<img src={qrPageUrlDataUrl} alt="QR Code" />
									</div>
									<h3 class="h3">รหัส</h3>
									<span>{data.otpSecret}</span>
									<h3 class="h3">รหัสยืนยัน</h3>
									<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
										<div class="input-group-shim">
											<Icon icon="ri:lock-password-fill" width="20" />
										</div>
										<input
											type="text"
											placeholder="รหัสยืนยัน"
											maxlength="6"
											class="text-lg"
											bind:value={otpToken}
										/>
									</div>
									<button
										class="btn variant-filled-primary"
										on:click={async () => {
											await save2FA();
										}}>ยืนยันรหัส</button
									>
								</div>
							</div>
						{/if}
					{:else}
						<div class="space-y-10 flex flex-col items-left">
							<div class="shadow-lg drop-shadow-lg card p-6 flex gap-4 flex-col">
								<h3>ยกเลิก 2FA</h3>
								<h2>คุณต้องการยกเลิกการใช้งาน 2FA หรือไม่ หากต้องการยกเลิก กรุณากรอกรหัสยืนยัน</h2>
								<h3 class="h3">รหัสยืนยัน</h3>
								<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
									<div class="input-group-shim">
										<Icon icon="ri:lock-password-fill" width="20" />
									</div>
									<input
										type="text"
										placeholder="รหัสยืนยัน"
										maxlength="6"
										class="text-lg"
										bind:value={otpToken}
									/>
								</div>
								<button
									class="btn variant-filled-primary"
									on:click={async () => {
										await cancel2FA();
									}}>ยืนยันรหัส</button
								>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
