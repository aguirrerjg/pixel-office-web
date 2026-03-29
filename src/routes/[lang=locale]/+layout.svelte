<script lang="ts">
	import { lang } from '$lib/i18n/store.js';
	import { page } from '$app/stores';

	// Sync i18n store with URL lang param
	$effect(() => {
		const routeLang = $page.params.lang;
		if (routeLang === 'es' || routeLang === 'en') {
			lang.set(routeLang);
		}
	});

	let { children } = $props();
</script>

{@render children()}
