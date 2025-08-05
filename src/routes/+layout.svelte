<script lang="ts">
	import '../app.postcss';
	import Icon from '@iconify/svelte';
	import { storePopup, AppBar, AppShell, LightSwitch, popup, initializeStores, Toast, getDrawerStore, Modal, type PopupSettings, Avatar, getToastStore } from '@skeletonlabs/skeleton'
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { alertError } from '$lib/utils/alerts';
	// Floating UI for Popups
	// import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	initializeStores();
	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();

	// storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	// Configure NProgress
	NProgress.configure({ minimum: 0.16, showSpinner: false });

	// Handle navigation loading states
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	let searchTerm = '';
	let leftAdVisible = true;
	let rightAdVisible = true;
	let bottomAdVisible = true;

	const handleKeyDown = async (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            // เช็คค่าว่างก่อนเรียก calculate
            if (!searchTerm) {
                toastStore.trigger(await alertError('ใส่ชื่อหนังเพื่อค้นหา'));
                return;
            }
			goto(`/search/${searchTerm}`);
			searchTerm = '';
        }
    };

	const closeLeftAd = () => {
		leftAdVisible = false;
	};

	const closeRightAd = () => {
		rightAdVisible = false;
	};

	const closeBottomAd = () => {
		bottomAdVisible = false;
	};
</script>

<Toast position="t"/>
<Modal />

<!-- Modern Navigation -->
<div class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-surface-800">
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between h-16 ">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2 animate-slideInLeft">
				<div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
					<Icon icon="mdi:movie" class="w-5 h-5" />
				</div>
				<span class="text-xl font-bold text-gradient">iMovie</span>
			</a>

			<!-- Search Bar -->
			<div class="flex-1 max-w-md mx-8 hidden md:block">
				<div class="relative">
					<input 
						type="text" 
						placeholder="ค้นหาหนัง..."
						bind:value={searchTerm}
						on:keydown={handleKeyDown}
						class="input variant-form-material pr-4 px-4 py-2 pl-10"
					/>
					<Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
				</div>
			</div>

			<!-- Desktop Navigation -->
			<nav class="flex items-center space-x-1">
				<LightSwitch />
			</nav>
		</div>

		<!-- Mobile Search Bar -->
		<div class="md:hidden pb-4">
			<div class="relative">
				<input 
					type="text" 
					placeholder="ค้นหาหนัง..."
					bind:value={searchTerm}
					on:keydown={handleKeyDown}
					class=" px-4 py-2 pl-10 pr-4 rounded-xl input variant-form-material"
				/>
				<Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
			</div>
		</div>
	</div>
</div>

<!-- Floating Side Ads -->
{#if leftAdVisible}
<div class="fixed left-1 md:left-4 top-1/2 transform -translate-y-1/2 z-40">
	<div class="relative w-16 h-48 md:w-24 lg:w-32 md:h-64 lg:h-96 bg-surface-200-700-token shadow-lg">
		<!-- Close Button -->
		<button 
			on:click={closeLeftAd}
			class="absolute -top-2 -right-2 w-6 h-6 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-200 shadow-md"
		>
			<Icon icon="mdi:close" class="w-4 h-4" />
		</button>
		
		<div class="w-full h-full bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center text-white text-xs font-bold text-center">
			<span class="hidden md:block">โฆษณา<br>120x400</span>
			<span class="md:hidden text-xs">โฆษณา<br>120x400</span>
		</div>
	</div>
</div>
{/if}

{#if rightAdVisible}
<div class="fixed right-1 md:right-4 top-1/2 transform -translate-y-1/2 z-40">
	<div class="relative w-16 h-48 md:w-24 lg:w-32 md:h-64 lg:h-96 bg-surface-200-700-token shadow-lg">
		<!-- Close Button -->
		<button 
			on:click={closeRightAd}
			class="absolute -top-2 -left-2 w-6 h-6 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-200 shadow-md"
		>
			<Icon icon="mdi:close" class="w-4 h-4" />
		</button>
		
		<div class="w-full h-full bg-gradient-to-b from-slate-700 to-slate-600 flex items-center justify-center text-white text-xs font-bold text-center">
			<span class="hidden md:block">โฆษณา<br>120x400</span>
			<span class="md:hidden text-xs">โฆษณา<br>120x400</span>
		</div>
	</div>
</div>
{/if}

<!-- Fixed Bottom Ad -->
{#if bottomAdVisible}
<div class="fixed left-0 right-0 z-50 lg:bottom-0 bottom-16">
	<div class="relative max-w-6xl mx-auto bg-surface-200-700-token shadow-lg">
		<div class="h-12 md:h-20 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-center">
			<span class="text-xs md:text-lg">โฆษณาด้านล่าง - 728x90 Leaderboard</span>
		</div>
		<button 
			on:click={closeBottomAd}
			class="absolute -top-2 right-0 w-6 h-6 bg-error-500 hover:bg-error-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors duration-200 shadow-md"
		>
			<Icon icon="mdi:close" class="w-4 h-4" />
		</button>
	</div>
</div>
{/if}

<!-- Main Content -->
<main class="pt-20 min-h-screen pb-28 lg:pb-20">
	<slot />
</main>

<!-- Footer -->
<footer class="bg-surface-backdrop-token">
	<div class="container mx-auto px-4">
		<div class="border-t border-white/10 mt-8 pt-4 pb-4 text-center text-sm opacity-75">
			<span>iMovie - เว็บดูหนังโป๊คุณภาพของทีมงานเซียนหนังXXX ที่จะมาสนองความเงี่ยนของท่านผู้ชมทั้งหลาย ในเว็บโป๊ของเราจะมีหนัง18+ คุณภาพระดับ HD มากมาย อัพเดทให้ท่านได้ติดตามกันทุกๆ วัน โดยเฉพาะคลิปหลุด คลิปโป๊ คลิปx คลิปไลฟ์สด หรือคลิปแอบถ่าย มีทั้งคลิปหลุดดังๆ คลิปหลุดหายาก คลิปหลุดนักศึกษา คลิปหลุดดารา คลิปหลุดตามกระแส คลิปหลุดสาวๆ จาก Onlyfans ที่มีทั้งงานเย็ด สวิงกิ้ง ช่วยตัวเอง โชว์หี โชว์ของลับกันแบบจัดเต็ม ไม่ว่าจะงานสาวไทยหรือต่างชาติเราสรรหามาให้คุณแล้ว หรือหากคุณเป็นแฟนหนังเอ็กค่ายดังๆ เราก็จัดมาให้ไม่มีขาด อย่างค่ายหนังxฝรั่งแจ่มๆ เช่น Brazzer, Blacked, Vixen, Mofos, Reality Kings, FAKEhub, Fake Taxi, Fake Hostel, Public Agent, Family Stroke, Bratty Sis, FAMILYxxx และอื่นๆ อีกมากมาย รวมถึงหนังโป๊เด็ดๆ แนว Amateur ที่มีงานดีๆ มากมาย แต่หากคุณมีรสนิยมแนวเลสเบี้ยน เกย์ รักร่วมเพศ ไม้ป่าเดียวกัน หญิงรักหญิง ชายรักชาย เรามีตั้งแต่คลิปหลุด คลิปโป๊ หนังเอ็กซ์ หนังXXX ทั้งคนไทยและต่างชาติ รวมถึงค่ายดังอย่าง Twistys, Girlsway, Babe, A Girl Know, Lesbea, Next Door Taboo, Active Duty และค่ายหนัง AV ของญี่ปุ่นด้วย ในเว็บไซต์ PORN inwporn2.com ยังให้คุณได้รับชมหนังเอวี JAV แบบเต็มเรื่องเน้นๆ เรื่องราวสนุกๆ เพิ่มอรรถรสด้วยหนัง JAV Subthai ที่มีซับบรรยาย มีทุกแนวไม่ว่า หนังแนวครอบครัว แนวข่มขืน แนวชู้สาว ครูเย็ดนักเรียน พี่เย็ดน้อง เย็ดสาวข้างห้อง เย็ดเมียเพื่อน เย็ดสะใภ้ เย็ดตูด เย็ดกะหรี่ รุมโทรม ลงแขก สวิงกิ้ง เซ็กส์หมู่ เย็ดสดแตกใน หลั่งใน สุดท้ายเรายังมีหนังAV หนังผู้ใหญ่ หนังอาร์ หนังอีโรติค หนังโป๊ไทย หนังโป๊จีน หนังโป๊เกาหลี และการ์ตูนอนิเมะ เฮ็นไต โดจิน ทั้งหลาย ดูได้ทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์ การันตรีความแจ่มของหนัง XXX เพื่อความบันเทิงในเว็บไซต์ของเราครบจบในที่เดียว ดูฟรีไม่เสียเงิน มาเสพย์หนังโป๊กันได้แบบเต็มอิ่ม</span>
			<hr class="mt-2 mb-2">
			<p>Copyrights &copy; 2025 หนังโป๊ หนังx หนังโป๊ออนไลน์ คลิปโป๊ คลิปหลุด คลิปแอบถ่าย หนังโป๊ไทย XXX PORN หี เย็ด หนังAV ดูหนังโป๊ฟรี iMovie All rights reserved.</p>
		</div>
	</div>
</footer>