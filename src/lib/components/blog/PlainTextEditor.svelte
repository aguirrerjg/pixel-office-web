<script lang="ts">
	import { toHTML, fromHTML } from '$lib/editor/prosemirrorUtil';
	import {
		singleLinePlainTextSchema,
		multiLinePlainTextSchema
	} from '$lib/editor/prosemirrorSchemas';
	import { activeEditorView } from '$lib/stores';
	import { EditorState, Plugin, type Transaction } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { history } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { baseKeymap } from 'prosemirror-commands';
	import { buildKeymap } from '$lib/editor/prosemirrorKeymap';

	// ── Props ────────────────────────────────────────────────────────────────
	let {
		content = $bindable(''),
		multiLine = false
	}: {
		content?: string;
		multiLine?: boolean;
	} = $props();

	// ── Editor state ─────────────────────────────────────────────────────────
	let prosemirrorNode: HTMLElement;
	let editorView: EditorView | undefined;
	let editorChange = $state(false);

	let schema = $derived(multiLine ? multiLinePlainTextSchema : singleLinePlainTextSchema);

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
			plugins: [keymap(buildKeymap(schema)), keymap(baseKeymap), history(), onUpdatePlugin]
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
		// Mount: create the editor
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

<div id="prosemirror-plain-editor" bind:this={prosemirrorNode}></div>

<style>
	:global(#prosemirror-plain-editor .ProseMirror) {
		outline: none;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #FAF8F5;
		font-family: Inter, sans-serif;
	}
</style>
