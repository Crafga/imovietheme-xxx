<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let title: string = '';
	export let description: string = '';
	export let url: string = '';
	export let image: string | null = '';
	export let hashtags: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let showText: boolean = true;
	export let variant: 'default' | 'floating' | 'minimal' = 'default';

	const toastStore = getToastStore();

	$: shareUrl = url || $page.url.href;
	$: shareTitle = title || 'ดูหนังออนไลน์ HD ฟรี';
	$: shareDescription = description || 'ชมหนังใหม่ล่าสุด คุณภาพ HD';
	$: shareImage = image && !image.startsWith('http') ? `${$page.url.origin}${image}` : image;

	// Icon sizes
	const iconSizes = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};

	// Button sizes
	const buttonSizes = {
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-3'
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			toastStore.trigger({
				message: 'คัดลอกลิงก์เรียบร้อย!',
				background: 'variant-filled-success',
				timeout: 2000
			});
		} catch (err) {
			console.error('Failed to copy: ', err);
			toastStore.trigger({
				message: '❌ ไม่สามารถคัดลอกลิงก์ได้',
				background: 'variant-filled-error',
				timeout: 2000
			});
		}
	};

	const shareToFacebook = () => {
		const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`;
		window.open(fbUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
	};

	const shareToTwitter = () => {
		const hashtag = hashtags ? `&hashtags=${encodeURIComponent(hashtags)}` : '';
		const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}${hashtag}`;
		window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
	};

	const shareToLine = () => {
		const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
		window.open(lineUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
	};

	const shareToTelegram = () => {
		const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
		window.open(telegramUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
	};

	const shareToWhatsApp = () => {
		const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
		window.open(whatsappUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
	};

	const shareNative = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: shareTitle,
					text: shareDescription,
					url: shareUrl
				});
			} catch (err) {
				console.error('Error sharing:', err);
			}
		} else {
			copyToClipboard();
		}
	};

	// Share platforms configuration
	const platforms = [
		{
			name: 'Facebook',
			icon: 'mdi:facebook',
			color: 'hover:bg-blue-600 bg-blue-500',
			action: shareToFacebook
		},
		{
			name: 'Twitter',
			icon: 'mdi:twitter',
			color: 'hover:bg-sky-600 bg-sky-500',
			action: shareToTwitter
		},
		{
			name: 'Line',
			icon: 'lineicons:line',
			color: 'hover:bg-green-600 bg-green-500',
			action: shareToLine
		},
		{
			name: 'Telegram',
			icon: 'mdi:telegram',
			color: 'hover:bg-blue-600 bg-blue-500',
			action: shareToTelegram
		},
		{
			name: 'WhatsApp',
			icon: 'mdi:whatsapp',
			color: 'hover:bg-green-600 bg-green-500',
			action: shareToWhatsApp
		},
		{
			name: 'Copy Link',
			icon: 'mdi:content-copy',
			color: 'hover:bg-gray-600 bg-gray-500',
			action: copyToClipboard
		}
	];
</script>

{#if variant === 'floating'}
	<!-- Floating Share Button -->
	<div class="fixed bottom-6 right-6 z-40 lg:hidden">
		<div class="relative group">
			<!-- Main Share Button -->
			<button
				class="p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
				on:click={shareNative}
			>
				<Icon icon="mdi:share-variant" class="w-6 h-6" />
			</button>

			<!-- Share Options (appears on hover/tap) -->
			<div class="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
				<div class="flex flex-col gap-2 bg-surface-800/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-surface-600">
					{#each platforms.slice(0, 4) as platform}
						<button
							class="flex items-center gap-3 px-3 py-2 rounded-lg {platform.color} text-white transition-all duration-200 hover:scale-105 text-sm"
							on:click={platform.action}
						>
							<Icon icon={platform.icon} class="w-4 h-4" />
							<span class="whitespace-nowrap">{platform.name}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else if variant === 'minimal'}
	<!-- Minimal Share (Just icons) -->
	<div class="flex items-center gap-2">
		{#each platforms as platform}
			<button
				class="{buttonSizes[
					size
				]} rounded-full {platform.color} text-white transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
				on:click={platform.action}
				title="แชร์ผ่าน {platform.name}"
			>
                <Icon icon={platform.icon} class={iconSizes[size]} />
			</button>
		{/each}
	</div>
{:else}
	<!-- Default Share Component -->
	<div class="space-y-4">
		{#if showText}
			<div class="text-center">
				<h3 class="text-lg font-semibold text-white mb-2">แชร์เนื้อหานี้</h3>
				<p class="text-sm text-surface-300">แชร์ให้เพื่อนๆ ได้ดูด้วยกัน</p>
			</div>
		{/if}

		<!-- Native Share (Mobile) -->
		{#if typeof navigator !== 'undefined' && 'share' in navigator}
			<button
				class="w-full flex items-center justify-center gap-3 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
				on:click={shareNative}
			>
				<Icon icon="mdi:share-variant" class={iconSizes[size]} />
				{#if showText}
					<span>แชร์</span>
				{/if}
			</button>
		{/if}

		<!-- Social Platform Buttons -->
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
			{#each platforms as platform}
				<button
					class="flex items-center justify-center gap-2 {buttonSizes[
						size
					]} lg:px-4 lg:py-3 rounded-lg {platform.color} text-white transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
					on:click={platform.action}
				>
					<Icon icon={platform.icon} class={iconSizes[size]} />
					{#if showText}
						<span class="text-sm font-medium hidden lg:inline">{platform.name}</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Quick Copy URL -->
		<div class="bg-surface-700/50 rounded-lg p-3">
			<div class="flex items-center gap-2">
				<input
					type="text"
					value={shareUrl}
					readonly
					class="flex-1 bg-transparent text-sm text-surface-300 outline-none"
				/>
				<button
					class="p-2 bg-surface-600 hover:bg-surface-500 rounded-md transition-colors"
					on:click={copyToClipboard}
				>
					<Icon icon="mdi:content-copy" class="w-4 h-4 text-white" />
				</button>
			</div>
		</div>
	</div>
{/if}
