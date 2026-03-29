<script lang="ts">
	import { toHTML, fromHTML } from '$lib/editor/prosemirrorUtil';
	import {
		singleLineRichTextSchema,
		multiLineRichTextSchema
	} from '$lib/editor/prosemirrorSchemas';
	import { activeEditorView } from '$lib/stores';
	import { EditorState, Plugin, type Transaction } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { history } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { baseKeymap } from 'prosemirror-commands';
	import { buildKeymap } from '$lib/editor/prosemirrorKeymap';
	import { buildInputRules } from '$lib/editor/prosemirrorInputrules';

	// ── Props ────────────────────────────────────────────────────────────────
	let {
		content = $bindable('<p>Enter text.</p>'),
		multiLine = false
	}: {
		content?: string;
		multiLine?: boolean;
	} = $props();

	// ── Editor state ─────────────────────────────────────────────────────────
	let prosemirrorNode: HTMLElement;
	let editorView: EditorView | undefined;
	let editorChange = $state(false);

	let schema = $derived(multiLine ? multiLineRichTextSchema : singleLineRichTextSchema);

	const onUpdatePlugin = new Plugin({
		view() {
			return {
				update(updatedView) {
					activeEditorView.set(updatedView);
				}
			};
		}
	});

	function buildEditorState(html: string) {
		const doc = fromHTML(schema, html);
		return EditorState.create({
			doc,
			schema,
			plugins: [
				buildInputRules(schema),
				keymap(buildKeymap(schema)),
				keymap(baseKeymap),
				history(),
				onUpdatePlugin
			]
		});
	}

	function dispatchTransaction(this: EditorView, transaction: Transaction) {
		const newState = this.state.apply(transaction);
		this.updateState(newState);
		if (transaction.docChanged) {
			content = toHTML(newState);
			editorChange = true;
		}
	}

	// ── Lifecycle ─────────────────────────────────────────────────────────────
	$effect(() => {
		const state = buildEditorState(content);
		editorView = new EditorView(prosemirrorNode, {
			state,
			dispatchTransaction
		});
		activeEditorView.set(editorView);

		return () => {
			editorView?.destroy();
			editorView = undefined;
		};
	});

	// Keep editor in sync when content changes externally
	$effect(() => {
		if (!editorView) return;
		if (editorChange) {
			editorChange = false;
			return;
		}
		const newState = buildEditorState(content);
		editorView.updateState(newState);
	});
</script>

<div id="prosemirror-rich-editor" bind:this={prosemirrorNode}></div>

<style>
	:global(#prosemirror-rich-editor .ProseMirror) {
		outline: none;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #FAF8F5;
		font-family: Inter, sans-serif;
		line-height: 1.7;
	}

	:global(#prosemirror-rich-editor .ProseMirror h2) {
		font-family: 'Playfair Display', serif;
		font-size: 1.5rem;
		color: #FAF8F5;
		margin: 1.5rem 0 0.75rem;
	}

	:global(#prosemirror-rich-editor .ProseMirror h3) {
		font-family: 'Playfair Display', serif;
		font-size: 1.25rem;
		color: #C9A84C;
		margin: 1.25rem 0 0.5rem;
	}

	:global(#prosemirror-rich-editor .ProseMirror blockquote) {
		border-left: 3px solid #C9A84C;
		padding-left: 1rem;
		color: rgba(250, 248, 245, 0.7);
		font-style: italic;
		margin: 1rem 0;
	}

	:global(#prosemirror-rich-editor .ProseMirror a) {
		color: #C9A84C;
		text-decoration: underline;
	}

	:global(#prosemirror-rich-editor .ProseMirror ul),
	:global(#prosemirror-rich-editor .ProseMirror ol) {
		padding-left: 1.5rem;
		margin: 0.75rem 0;
	}

	:global(#prosemirror-rich-editor .ProseMirror p) {
		margin: 0.5rem 0;
	}
</style>
