<script lang="ts">
	import { extractTeaser, fetchJSON } from '$lib/util';
	import { goto } from '$app/navigation';
	import Article from '$lib/components/blog/Article.svelte';
	import EditorToolbar from '$lib/components/blog/EditorToolbar.svelte';
	import LangSwitch from '$lib/components/blog/LangSwitch.svelte';
	import { isEditing } from '$lib/stores';
	import { onMount, onDestroy } from 'svelte';

	let { data } = $props();

	let title = $state('Título del artículo');
	let teaser = $state('Descripción breve del artículo');
	let content = $state('<p>Escribe aquí el contenido del artículo.</p>');
	let thumbnail = $state('');
	let thumbnailId = $state('');

	onMount(() => { $isEditing = true; });
	onDestroy(() => { $isEditing = false; });

	async function createArticle() {
		if (!data.session) return alert('No autorizado.');
		const _teaser = teaser || extractTeaser(content);
		try {
			const { slug } = await fetchJSON('POST', '/api/create-article', {
				title, content, teaser: _teaser, thumbnail, thumbnailId, languageCode: data.lang
			});
			goto(`/${data.lang}/blog/${slug}`);
		} catch (err) {
			console.error(err);
			alert('Ya existe un artículo con ese título. Elige otro.');
		}
	}

	function discardDraft() {
		goto(`/${data.lang}/blog`);
	}
</script>

<svelte:head>
	<title>Nuevo artículo | Blog — Agent Squad</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-5 py-6 pt-24">
	<div class="flex items-center justify-between mb-4">
		<h1 class="text-2xl font-bold font-[var(--display)] text-[var(--text)]">
			{data.lang === 'es' ? 'Nuevo artículo' : 'New article'}
			<span class="text-[var(--gold)] text-lg ml-2">({data.lang.toUpperCase()})</span>
		</h1>
		<LangSwitch lang={data.lang} />
	</div>
	<EditorToolbar oncancel={discardDraft} onsave={createArticle} />
	<Article bind:title bind:teaser bind:content bind:thumbnail bind:thumbnailId />
</div>
