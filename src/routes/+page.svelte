<script lang="ts">
	import { lang } from '$lib/i18n/store.js';
	import { t } from '$lib/i18n/translations.js';
	import Hero from '$lib/components/Hero.svelte';
	import Showcase from '$lib/components/Showcase.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Features from '$lib/components/Features.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let i = $derived(t[$lang]);
</script>

<Hero {i} />
<Showcase {i} />
<Stats {i} />
<Features {i} />
<CtaSection {i} />
<Footer />
