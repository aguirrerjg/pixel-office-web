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
	{#await import('./RichTextEditor.svelte')}
		<div>{@html content}</div>
	{:then RichTextEditorModule}
		<RichTextEditorModule.default {multiLine} bind:content />
	{/await}
{:else}
	<div class="rich-content">
		{@html content}
	</div>
{/if}

<style>
	.rich-content :global(h2) {
		font-family: 'Playfair Display', serif;
		font-size: 1.5rem;
		color: #FAF8F5;
		margin: 1.5rem 0 0.75rem;
	}

	.rich-content :global(h3) {
		font-family: 'Playfair Display', serif;
		font-size: 1.25rem;
		color: #C9A84C;
		margin: 1.25rem 0 0.5rem;
	}

	.rich-content :global(blockquote) {
		border-left: 3px solid #C9A84C;
		padding-left: 1rem;
		color: rgba(250, 248, 245, 0.7);
		font-style: italic;
		margin: 1rem 0;
	}

	.rich-content :global(a) {
		color: #C9A84C;
		text-decoration: underline;
	}

	.rich-content :global(ul),
	.rich-content :global(ol) {
		padding-left: 1.5rem;
		margin: 0.75rem 0;
	}

	.rich-content :global(p) {
		color: #FAF8F5;
		line-height: 1.7;
		margin: 0.5rem 0;
	}
</style>
