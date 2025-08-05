<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import ErrorPage from '$lib/components/ErrorPage.svelte';
	
</script>

{#if $page}
	<div class="w-full h-full flex justify-center items-center">
		<div class="text-center space-y-4">
			<ErrorPage />
			<h2 class="h2">
				{$page.status} : {#if $page.error} {$page.error.message} {/if}
			</h2>
			<p>We're sorry, something went wrong.</p>
		</div>
	</div>
{/if}