<script lang="ts">
	import { page } from '$app/stores';

	let { lang = 'es' }: { lang?: string } = $props();

	let otherLang = $derived(lang === 'es' ? 'en' : 'es');

	// Build the URL for the other language by replacing the lang segment
	let otherUrl = $derived(() => {
		const path = $page.url.pathname;
		// Replace /es/ or /en/ at the start with the other lang
		return path.replace(/^\/(es|en)(\/|$)/, `/${otherLang}$2`);
	});
</script>

<div class="inline-flex items-center gap-1 rounded-full border border-[var(--gold-border)] bg-[var(--gold-dim)] p-0.5">
	<a
		href={lang === 'es' ? 'javascript:void(0)' : otherUrl()}
		class="px-3 py-1 rounded-full text-xs font-bold font-[var(--mono)] tracking-wider transition-all
			{lang === 'es'
				? 'bg-[var(--gold)] text-[#0D0D12]'
				: 'text-[var(--gold)] hover:bg-[rgba(201,168,76,0.15)]'}"
		aria-current={lang === 'es' ? 'true' : undefined}
	>
		ES
	</a>
	<a
		href={lang === 'en' ? 'javascript:void(0)' : otherUrl()}
		class="px-3 py-1 rounded-full text-xs font-bold font-[var(--mono)] tracking-wider transition-all
			{lang === 'en'
				? 'bg-[var(--gold)] text-[#0D0D12]'
				: 'text-[var(--gold)] hover:bg-[rgba(201,168,76,0.15)]'}"
		aria-current={lang === 'en' ? 'true' : undefined}
	>
		EN
	</a>
</div>
