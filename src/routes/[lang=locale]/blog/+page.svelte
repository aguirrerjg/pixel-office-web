<script lang="ts">
	import ArticleTeaser from '$lib/components/blog/ArticleTeaser.svelte';
	import BlogControls from '$lib/components/blog/BlogControls.svelte';
	import { formatDate } from '$lib/util';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Agent Squad</title>
	<meta name="description" content="Artículos sobre agentes IA, automatización y equipos autónomos." />
</svelte:head>

<div class="w-full">
	<div class="mx-auto px-5 py-6">
		<div class="flex flex-col md:flex-row justify-between md:items-center gap-10 pt-24 pb-6 max-w-2xl">
			<h1 class="text-4xl md:text-5xl font-bold text-[var(--text)] pb-3" style="font-family: var(--display); line-height: 1.5; overflow: visible;">Blog</h1>
		</div>
	</div>
</div>

<div class="max-w-7xl mx-auto px-5">
	<BlogControls session={data.session} lang={data.lang} />

	{#if data.articles && data.articles.length > 0}
		{@const firstArticle = data.articles[0]}

		{#if firstArticle}
			<div class="group grid md:grid-cols-10 w-full items-center gap-4 md:gap-8 pb-8">
				<a href="/{data.lang}/blog/{firstArticle.slug}" class="inline-block md:col-span-6">
					{#if firstArticle.thumbnail}
						<img src={firstArticle.thumbnail} alt={firstArticle.title} loading="lazy" width="1280" height="720" class="w-full aspect-video object-cover rounded-lg border border-[var(--border)]" />
					{:else}
						<div class="w-full aspect-video bg-[var(--bg2)] rounded-lg border border-[var(--border)] flex items-center justify-center">
							<span class="text-[var(--text-muted)]">Sin imagen</span>
						</div>
					{/if}
				</a>
				<div class="flex flex-col md:gap-4 md:col-span-4" class:opacity-50={!firstArticle.published_at}>
					<span class="inline-flex items-center gap-2 text-[var(--text-muted)]">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span class="text-lg font-medium">{formatDate(firstArticle.published_at ?? new Date())}</span>
					</span>
					<a href="/{data.lang}/blog/{firstArticle.slug}" class="inline-block my-1">
						<h2 class="text-3xl leading-10 font-semibold text-[var(--text)] hover:text-[var(--gold)] transition-colors">{firstArticle.title}</h2>
					</a>
					<a href="/{data.lang}/blog/{firstArticle.slug}">
						<p class="text-lg text-[var(--text-muted)] line-clamp-3">{firstArticle.teaser}</p>
					</a>
					<a class="text-[var(--gold)] font-semibold text-lg w-fit hover:underline" href="/{data.lang}/blog/{firstArticle.slug}">
						<span>Leer más <span class="inline-block ml-1 group-hover:ml-3 transition-all" aria-hidden="true">&rarr;</span></span>
					</a>
				</div>
			</div>
		{/if}

		{#if data.articles.length > 1}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each data.articles.slice(1) as article}
					<ArticleTeaser {article} lang={data.lang} />
				{/each}
			</div>
		{/if}
	{:else}
		<div class="text-xl py-4 text-[var(--text-muted)]">No hay artículos publicados aún.</div>
	{/if}
</div>
