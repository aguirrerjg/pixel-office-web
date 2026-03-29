<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { isEditing } from '$lib/stores';
	import { fetchJSON } from '$lib/util';

	let { session = null, lang = 'es' }: { session?: any; lang?: string } = $props();

	let isBlogArticle = $derived(
		!!$page.data?.article?.article_id &&
		!!$page.data?.article?.slug &&
		$page.route.id === '/[lang=locale]/blog/[slug]'
	);

	async function handleDelete() {
		if (!confirm('¿Estás seguro de que quieres eliminar este artículo? Esta acción es irreversible.')) return;
		if (!session) return alert('No autorizado.');
		try {
			await fetchJSON('POST', '/api/delete-article', { articleId: $page.data.article?.article_id });
			goto(`/${lang}/blog`);
		} catch (err) {
			console.error(err);
			alert('Error eliminando el artículo.');
		}
	}
</script>

{#if session}
<div class="max-w-8xl mx-auto mt-2 pb-6 flex flex-wrap gap-2">
	{#if isBlogArticle}
		<button
			class="px-4 py-1.5 rounded-full text-sm font-semibold bg-[var(--gold)] text-[#0D0D12] hover:bg-[#d4b460] transition-colors disabled:opacity-30"
			onclick={() => { $isEditing = true; }}
			disabled={$isEditing}
		>
			Editar
		</button>
		<button
			class="px-4 py-1.5 rounded-full text-sm font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30"
			onclick={handleDelete}
			disabled={$isEditing}
		>
			Eliminar
		</button>
	{:else}
		<a class="px-4 py-1.5 rounded-full text-sm font-semibold bg-[var(--gold)] text-[#0D0D12] hover:bg-[#d4b460] transition-colors" href="/{lang}/blog/new">
			Nuevo artículo
		</a>
	{/if}
	<a
		class="px-4 py-1.5 rounded-full text-sm font-semibold border border-[var(--gold-border)] text-[var(--text)] hover:bg-[var(--gold-dim)] transition-colors"
		class:pointer-events-none={$isEditing}
		class:opacity-30={$isEditing}
		href="/{lang}/admin/logout"
	>
		Cerrar sesión
	</a>
</div>
{/if}
