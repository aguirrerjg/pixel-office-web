<script lang="ts">
	import { extractTeaser, fetchJSON } from '$lib/util';
	import ArticleTeaser from '$lib/components/blog/ArticleTeaser.svelte';
	import Article from '$lib/components/blog/Article.svelte';
	import EditorToolbar from '$lib/components/blog/EditorToolbar.svelte';
	import LangSwitch from '$lib/components/blog/LangSwitch.svelte';
	import { isEditing } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import BlogControls from '$lib/components/blog/BlogControls.svelte';

	let { data } = $props();

	let title = $state(data.article.title ?? '');
	let teaser = $state(data.article.teaser ?? '');
	let content = $state(data.article.content ?? '');
	let thumbnail = $state(data.article.thumbnail ?? '');
	let thumbnailId = $state(data.article.thumbnail_id ?? '');

	const BASE_URL = 'https://agentsquadai.com';

	let publishedAt = $derived(data.article.published_at ? new Date(data.article.published_at) : null);
	let updatedAt = $derived(data.article.updated_at ? new Date(data.article.updated_at) : null);

	let jsonLd = $derived(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": title,
		"description": teaser,
		"image": thumbnail || undefined,
		"datePublished": publishedAt?.toISOString(),
		"dateModified": updatedAt?.toISOString() ?? publishedAt?.toISOString(),
		"author": {
			"@type": "Person",
			"name": "Roberto Aguirre"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Agent Squad",
			"url": BASE_URL,
			"logo": {
				"@type": "ImageObject",
				"url": BASE_URL + "/logo.svg"
			}
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": `${BASE_URL}/${data.lang}/blog/${data.article.slug}`
		}
	}));

	let ogUrl = $derived(`${BASE_URL}/${data.lang}/blog/${data.article.slug}`);

	function initOrReset() {
		$isEditing = false;
		title = data.article.title ?? '';
		teaser = data.article.teaser ?? '';
		content = data.article.content ?? '';
		thumbnail = data.article.thumbnail ?? '';
		thumbnailId = data.article.thumbnail_id ?? '';
	}

	onMount(() => initOrReset());
	onDestroy(() => { $isEditing = false; });

	async function saveArticle() {
		if (!data.session) return alert('No autorizado.');
		const _teaser = teaser || extractTeaser(content);
		try {
			await fetchJSON('POST', '/api/update-article', {
				articleId: data.article.article_id,
				title, content,
				teaser: _teaser,
				thumbnail, thumbnailId,
				languageCode: data.lang
			});
			$isEditing = false;
		} catch (err) {
			console.error(err);
			alert('Error guardando. Copia tu artículo en un lugar seguro antes de reintentar.');
		}
	}
</script>

<svelte:head>
	<title>{title} | Blog — Agent Squad</title>
	<meta name="description" content={teaser} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={teaser} />
	{#if thumbnail}
		<meta property="og:image" content={thumbnail} />
	{/if}
	<meta property="og:url" content={ogUrl} />
	<meta property="og:site_name" content="Agent Squad" />
	<meta property="og:locale" content={data.lang === 'es' ? 'es_ES' : 'en_US'} />
	{#if publishedAt}
		<meta property="article:published_time" content={publishedAt.toISOString()} />
	{/if}
	{#if updatedAt}
		<meta property="article:modified_time" content={updatedAt.toISOString()} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={teaser} />
	{#if thumbnail}
		<meta name="twitter:image" content={thumbnail} />
	{/if}

	<link rel="canonical" href={ogUrl} />

	<!-- JSON-LD Article Schema -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="pt-6 pb-12 px-5 max-w-7xl mx-auto">
	<div class="flex items-center justify-between pt-24 pb-4">
		<BlogControls session={data.session} lang={data.lang} />
		<LangSwitch lang={data.lang} />
	</div>
	<EditorToolbar oncancel={initOrReset} onsave={saveArticle} />

	<Article bind:title bind:content bind:teaser bind:thumbnail bind:thumbnailId published_at={data.article.published_at} />

	{#if data.articles.length > 0}
		<div class="border-t border-[var(--border)] space-y-4 mt-8">
			<div class="pt-8">
				<div class="font-bold text-sm text-[var(--gold)] font-[var(--mono)] uppercase tracking-wider">Leer siguiente</div>
			</div>
			{#each data.articles as article}
				<ArticleTeaser {article} lang={data.lang} asReadNext />
			{/each}
		</div>
	{/if}
</div>
