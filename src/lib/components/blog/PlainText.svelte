<script lang="ts">
	import { isEditing } from '$lib/stores';

	let {
		content,
		multiLine = false
	}: {
		content: string;
		multiLine?: boolean;
	} = $props();
</script>

{#if $isEditing}
	{#await import('./PlainTextEditor.svelte')}
		{@html content}
	{:then PlainTextEditorModule}
		<PlainTextEditorModule.default {multiLine} bind:content />
	{/await}
{:else}
	{@html content}
{/if}
