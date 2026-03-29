<script lang="ts">
	import { extractTeaser, fetchJSON } from '$lib/util';
	import ArticleTeaser from '$lib/components/blog/ArticleTeaser.svelte';
	import Article from '$lib/components/blog/Article.svelte';
	import EditorToolbar from '$lib/components/blog/EditorToolbar.svelte';
	import { isEditing } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import BlogControls from '$lib/components/blog/BlogControls.svelte';

	let { data } = $props();

	let title = $state(data.article.title ?? '');
	let teaser = $state(data.article.teaser ?? '');
	let content = $state(data.article.content ?? '');
	let thumbnail = $state(data.article.thumbnail ?? '');
	let thumbnailId = $state(data.article.thumbnail_id ?? '');

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
</svelte:head>

<div class="pt-6 pb-12 px-5 max-w-7xl mx-auto">
	<BlogControls session={data.session} lang={data.lang} />
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
