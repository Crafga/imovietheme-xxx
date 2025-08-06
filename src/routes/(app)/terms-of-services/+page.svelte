<script lang="ts">
	import type { PageData } from './$types';
	import { generateSeoTags, generateBreadcrumbJsonLd, type JsonLd } from '$lib/utils/seo';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	// SEO configuration
	$: seoConfig = {
		title: `${data.meta.title} - ${data.set?.webname || 'Movie Site'}`,
		description: data.meta.description,
		canonical: data.meta.canonical,
		type: data.meta.type,
		siteName: data.set?.webname || 'Movie Site',
		locale: 'en_US',
		keywords: ['terms of service', 'legal', 'policy', 'movie streaming', 'user agreement'],
		modifiedTime: data.meta.lastModified
	};

	// Breadcrumb structured data
	$: breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: 'Home', url: data.baseUrl },
		{ name: 'Terms of Service', url: data.currentUrl }
	]);

	// Terms of Service JSON-LD
	$: termsJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Terms of Service',
		description: data.meta.description,
		url: data.currentUrl,
		isPartOf: {
			'@type': 'WebSite',
			name: data.set?.webname || 'Movie Site',
			url: data.baseUrl
		},
		dateModified: data.meta.lastModified,
		inLanguage: 'en-US'
	};

	const lastUpdated = new Date().toLocaleDateString('en-US', { 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric' 
	});
</script>

<svelte:head>
	{@html generateSeoTags(seoConfig)}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(termsJsonLd)}</script>`}
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Breadcrumb -->
	<nav class="flex mb-8" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<li class="inline-flex items-center">
				<a href="/" class="text-primary-600 hover:text-primary-700 inline-flex items-center">
					<Icon icon="mdi:home" class="w-4 h-4 mr-2" />
					Home
				</a>
			</li>
			<li>
				<div class="flex items-center">
					<Icon icon="mdi:chevron-right" class="w-4 h-4 text-surface-400" />
					<span class="ml-1 text-surface-500 md:ml-2">Terms of Service</span>
				</div>
			</li>
		</ol>
	</nav>

	<!-- Header -->
	<header class="text-center mb-12">
		<div class="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full mb-6">
			<Icon icon="mdi:file-document-outline" class="w-8 h-8" />
		</div>
		<h1 class="h1 mb-4">Terms of Service</h1>
		<p class="text-xl text-surface-600 max-w-3xl mx-auto">
			Please read these Terms of Service carefully before using our movie streaming platform.
		</p>
		<div class="flex flex-wrap justify-center items-center gap-4 mt-6 text-sm text-surface-500">
			<div class="flex items-center gap-2">
				<Icon icon="mdi:calendar-clock" class="w-4 h-4" />
				<span>Last Updated: {lastUpdated}</span>
			</div>
			<div class="flex items-center gap-2">
				<Icon icon="mdi:shield-check" class="w-4 h-4" />
				<span>Legally Binding Agreement</span>
			</div>
		</div>
	</header>

	<!-- Table of Contents -->
	<aside class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 mb-8 sticky top-4">
		<h2 class="h4 mb-4 flex items-center gap-2">
			<Icon icon="mdi:format-list-bulleted" class="w-5 h-5" />
			Table of Contents
		</h2>
		<nav class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<a href="#acceptance" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">1. Acceptance of Terms</a>
			<a href="#description" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">2. Service Description</a>
			<a href="#eligibility" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">3. User Eligibility</a>
			<a href="#accounts" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">4. User Accounts</a>
			<a href="#conduct" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">5. Prohibited Conduct</a>
			<a href="#content" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">6. Content Rights</a>
			<a href="#privacy" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">7. Privacy Policy</a>
			<a href="#disclaimers" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">8. Disclaimers</a>
			<a href="#limitation" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">9. Limitation of Liability</a>
			<a href="#termination" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">10. Termination</a>
			<a href="#changes" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">11. Changes to Terms</a>
			<a href="#contact" class="text-primary-600 hover:text-primary-700 py-1 px-2 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">12. Contact Information</a>
		</nav>
	</aside>

	<!-- Terms Content -->
	<main class="prose prose-lg max-w-none dark:prose-invert">
		<section id="acceptance" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
				<h2 class="h3 mb-0">Acceptance of Terms</h2>
			</div>
			<div class="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-4 mb-4">
				<div class="flex items-start gap-3">
					<Icon icon="mdi:alert" class="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
					<div>
						<p class="text-warning-800 dark:text-warning-200 mb-0">
							<strong>Important:</strong> By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
						</p>
					</div>
				</div>
			</div>
			<p>
				These Terms of Service ("Terms") constitute a legally binding agreement between you and {data.set?.webname || 'our movie streaming platform'}. 
				If you do not agree to these Terms, please do not use our services.
			</p>
		</section>

		<section id="description" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
				<h2 class="h3 mb-0">Service Description</h2>
			</div>
			<p>
				Our platform provides access to a collection of movies and entertainment content for your viewing pleasure. 
				We offer various features including:
			</p>
			<ul class="space-y-2">
				<li class="flex items-start gap-2">
					<Icon icon="mdi:check-circle" class="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
					<span>Streaming access to movies and videos</span>
				</li>
				<li class="flex items-start gap-2">
					<Icon icon="mdi:check-circle" class="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
					<span>Search and discovery features</span>
				</li>
				<li class="flex items-start gap-2">
					<Icon icon="mdi:check-circle" class="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
					<span>Content categorization and recommendations</span>
				</li>
				<li class="flex items-start gap-2">
					<Icon icon="mdi:check-circle" class="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
					<span>User-friendly interface across devices</span>
				</li>
			</ul>
		</section>

		<section id="eligibility" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
				<h2 class="h3 mb-0">User Eligibility</h2>
			</div>
			<p>
				To access and use our services, you must:
			</p>
			<ul class="space-y-2">
				<li class="flex items-start gap-2">
					<Icon icon="mdi:account-check" class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
					<span>Be at least 13 years of age (or the minimum age required in your jurisdiction)</span>
				</li>
				<li class="flex items-start gap-2">
					<Icon icon="mdi:account-check" class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
					<span>Have the legal capacity to enter into this agreement</span>
				</li>
				<li class="flex items-start gap-2">
					<Icon icon="mdi:account-check" class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
					<span>Comply with all applicable laws and regulations</span>
				</li>
			</ul>
		</section>

		<section id="accounts" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
				<h2 class="h3 mb-0">User Accounts</h2>
			</div>
			<p>
				When creating an account with us, you agree to:
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
					<div class="flex items-center gap-2 mb-2">
						<Icon icon="mdi:shield-account" class="w-5 h-5 text-primary-600" />
						<span class="font-semibold">Account Security</span>
					</div>
					<p class="text-sm text-surface-600 dark:text-surface-300 mb-0">
						Maintain the confidentiality of your login credentials and be responsible for all activities under your account.
					</p>
				</div>
				<div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
					<div class="flex items-center gap-2 mb-2">
						<Icon icon="mdi:information-outline" class="w-5 h-5 text-primary-600" />
						<span class="font-semibold">Accurate Information</span>
					</div>
					<p class="text-sm text-surface-600 dark:text-surface-300 mb-0">
						Provide accurate, current, and complete information during registration and keep it updated.
					</p>
				</div>
			</div>
		</section>

		<section id="conduct" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
				<h2 class="h3 mb-0">Prohibited Conduct</h2>
			</div>
			<div class="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4 mb-4">
				<div class="flex items-start gap-3">
					<Icon icon="mdi:alert-octagon" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
					<div>
						<p class="text-error-800 dark:text-error-200 mb-0">
							<strong>Prohibited Activities:</strong> The following activities are strictly forbidden and may result in account termination.
						</p>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<ul class="space-y-2">
					<li class="flex items-start gap-2">
						<Icon icon="mdi:close-circle" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
						<span>Unauthorized access or hacking attempts</span>
					</li>
					<li class="flex items-start gap-2">
						<Icon icon="mdi:close-circle" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
						<span>Distribution of malware or viruses</span>
					</li>
					<li class="flex items-start gap-2">
						<Icon icon="mdi:close-circle" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
						<span>Violation of intellectual property rights</span>
					</li>
				</ul>
				<ul class="space-y-2">
					<li class="flex items-start gap-2">
						<Icon icon="mdi:close-circle" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
						<span>Spam or unsolicited communications</span>
					</li>
					<li class="flex items-start gap-2">
						<Icon icon="mdi:close-circle" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
						<span>Harassment or abusive behavior</span>
					</li>
					<li class="flex items-start gap-2">
						<Icon icon="mdi:close-circle" class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
						<span>Commercial use without authorization</span>
					</li>
				</ul>
			</div>
		</section>

		<section id="content" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
				<h2 class="h3 mb-0">Content Rights</h2>
			</div>
			<p>
				All content provided on this platform, including but not limited to movies, images, text, graphics, and user interface, 
				is protected by intellectual property laws. Users are granted a limited, non-exclusive license to access and use the content 
				for personal, non-commercial purposes only.
			</p>
		</section>

		<section id="privacy" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</div>
				<h2 class="h3 mb-0">Privacy Policy</h2>
			</div>
			<div class="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg p-4">
				<div class="flex items-start gap-3">
					<Icon icon="mdi:shield-lock" class="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
					<div>
						<p class="text-info-800 dark:text-info-200 mb-0">
							Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
							use, and protect your information when using our services.
						</p>
					</div>
				</div>
			</div>
		</section>

		<section id="disclaimers" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">8</div>
				<h2 class="h3 mb-0">Disclaimers</h2>
			</div>
			<p>
				Our service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. 
				Content availability may vary and is subject to change without notice.
			</p>
		</section>

		<section id="limitation" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">9</div>
				<h2 class="h3 mb-0">Limitation of Liability</h2>
			</div>
			<p>
				To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, 
				special, or consequential damages arising from your use of our service.
			</p>
		</section>

		<section id="termination" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">10</div>
				<h2 class="h3 mb-0">Termination</h2>
			</div>
			<p>
				We reserve the right to terminate or suspend your account and access to our service at our discretion, 
				without notice, for violation of these Terms or any applicable law.
			</p>
		</section>

		<section id="changes" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">11</div>
				<h2 class="h3 mb-0">Changes to Terms</h2>
			</div>
			<p>
				We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
				Your continued use of the service after changes constitutes acceptance of the modified Terms.
			</p>
		</section>

		<section id="contact" class="mb-8 scroll-mt-8">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">12</div>
				<h2 class="h3 mb-0">Contact Information</h2>
			</div>
			<div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-6">
				<p class="mb-4">
					If you have any questions about these Terms of Service, please contact us:
				</p>
				<div class="flex flex-wrap gap-6">
					<div class="flex items-center gap-2">
						<Icon icon="mdi:email" class="w-5 h-5 text-primary-600" />
						<span>support@{data.set?.webname ? data.set.webname.toLowerCase().replace(/\s+/g, '') : 'moviesite'}.com</span>
					</div>
					<div class="flex items-center gap-2">
						<Icon icon="mdi:web" class="w-5 h-5 text-primary-600" />
						<span>{data.baseUrl}</span>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- Bottom CTA -->
	<footer class="mt-12 text-center">
		<div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
			<Icon icon="mdi:handshake" class="w-12 h-12 text-primary-600 mx-auto mb-4" />
			<h3 class="h4 mb-4">Thank you for choosing our service</h3>
			<p class="text-surface-600 mb-6 max-w-2xl mx-auto">
				By using our platform, you agree to these Terms of Service. We're committed to providing you with 
				the best movie streaming experience possible.
			</p>
			<a href="/" class="btn variant-filled-primary">
				<Icon icon="mdi:arrow-left" class="w-4 h-4" />
				<span>Back to Home</span>
			</a>
		</div>
	</footer>

	<section id="contact" class="mb-8 scroll-mt-8 mt-4">
		<div class="flex items-center gap-3 mb-4">
			<h2 class="h3 mb-0">Recent Posts</h2>
		</div>
		<div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-6">
			{#each data.newMovie ?? [] as v}
				<a href="/movie/{v.id}" class="hover:text-rose-500">
					<p class="mb-4">
						{v.Title}
					</p>
				</a>
			{/each}
		</div>
	</section>
</div>