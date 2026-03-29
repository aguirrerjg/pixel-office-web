<script lang="ts">
	import { activeEditorView, isEditing } from '$lib/stores';
	import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
	import { wrapInList } from 'prosemirror-schema-list';
	import { markActive, blockTypeActive, canInsert } from '$lib/editor/prosemirrorUtil';
	import { createLink, insertImage } from '$lib/editor/prosemirrorCommands';
	import { nanoid } from '$lib/util';
	import { uploadImageFromEditor } from '$lib/uploadAsset';
	import type { EditorView } from 'prosemirror-view';
	import type { EditorState } from 'prosemirror-state';

	// ── Props ────────────────────────────────────────────────────────────────
	let {
		oncancel,
		onsave
	}: {
		oncancel?: () => void;
		onsave?: () => void;
	} = $props();

	// ── Editor state ─────────────────────────────────────────────────────────
	let editorView = $state<EditorView | null>(null);
	let editorState = $state<EditorState | null>(null);

	// Subscribe to active editor view
	const unsubscribe = activeEditorView.subscribe((value) => {
		editorView = value;
		if (value?.state) editorState = value.state;
	});

	// ── Save / Cancel ─────────────────────────────────────────────────────────
	let isSaving = $state(false);

	function handleCancel() {
		oncancel?.();
	}

	function handleSave() {
		if (isSaving) return;
		isSaving = true;
		onsave?.();
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
			handleSave();
			e.preventDefault();
			e.stopPropagation();
		}
	}

	// ── UploadImageModal state ────────────────────────────────────────────────
	let showUploadModal = $state(false);

	function openUploadModal() {
		if (!editorState || !insertImage(editorState, null, editorView)) return;
		showUploadModal = true;
	}

	async function handleImageSave(result: { croppedImageUrl: string; imageAsBlob: Blob; alt: string }) {
		showUploadModal = false;
		if (!editorView || !editorState) return;
		const schema = editorState.schema;
		const path = 'image__' + nanoid() + '.png';
		await uploadImageFromEditor(result.alt, path, result.imageAsBlob, schema, editorView, editorState);
	}

	// ── Button helpers ────────────────────────────────────────────────────────
	function btnClass(active: boolean, disabled: boolean) {
		const base = 'rounded-full p-2 transition-colors disabled:opacity-30 ';
		if (disabled) return base + 'opacity-30 cursor-not-allowed';
		if (active) return base + 'bg-[#C9A84C] text-[#0D0D12]';
		return base + 'text-[#FAF8F5] hover:bg-[rgba(201,168,76,0.12)]';
	}

	// ── Mark toggles ─────────────────────────────────────────────────────────
	function isMarkActive(type: string): boolean {
		if (!editorState) return false;
		const markType = editorState.schema.marks[type];
		if (!markType) return false;
		return markActive(editorState, markType);
	}

	function isMarkDisabled(type: string): boolean {
		if (!editorState || !editorView) return true;
		const markType = editorState.schema.marks[type];
		if (!markType) return true;
		return !toggleMark(markType)(editorState, undefined);
	}

	function handleToggleMark(type: string) {
		if (!editorState || !editorView) return;
		const markType = editorState.schema.marks[type];
		if (!markType) return;
		toggleMark(markType)(editorState, editorView.dispatch, editorView);
		editorView.focus();
	}

	// ── Heading toggles ───────────────────────────────────────────────────────
	function isHeadingActive(level: number): boolean {
		if (!editorState) return false;
		return blockTypeActive(editorState, editorState.schema.nodes.heading, { level });
	}

	function isHeadingDisabled(): boolean {
		if (!editorState || !editorView) return true;
		const schema = editorState.schema;
		return (
			!setBlockType(schema.nodes.heading)(editorState) &&
			!setBlockType(schema.nodes.paragraph)(editorState)
		);
	}

	function handleToggleHeading(level: number) {
		if (!editorState || !editorView) return;
		const schema = editorState.schema;
		if (isHeadingActive(level)) {
			setBlockType(schema.nodes.paragraph)(editorState, editorView.dispatch);
		} else {
			setBlockType(schema.nodes.heading, { level })(editorState, editorView.dispatch);
		}
		editorView.focus();
	}

	// ── Blockquote ────────────────────────────────────────────────────────────
	function isBlockquoteDisabled(): boolean {
		if (!editorState || !editorView) return true;
		return !wrapIn(editorState.schema.nodes.blockquote)(editorView.state);
	}

	function handleBlockquote() {
		if (!editorState || !editorView) return;
		wrapIn(editorState.schema.nodes.blockquote)(editorState, editorView.dispatch);
		editorView.focus();
	}

	// ── Lists ─────────────────────────────────────────────────────────────────
	function isBulletListDisabled(): boolean {
		if (!editorState || !editorView) return true;
		return !wrapInList(editorState.schema.nodes.bullet_list)(editorView.state);
	}

	function handleBulletList() {
		if (!editorState || !editorView) return;
		wrapInList(editorState.schema.nodes.bullet_list)(editorState, editorView.dispatch);
		editorView.focus();
	}

	function isOrderedListDisabled(): boolean {
		if (!editorState || !editorView) return true;
		return !wrapInList(editorState.schema.nodes.ordered_list)(editorView.state);
	}

	function handleOrderedList() {
		if (!editorState || !editorView) return;
		wrapInList(editorState.schema.nodes.ordered_list)(editorState, editorView.dispatch);
		editorView.focus();
	}

	// ── Link ──────────────────────────────────────────────────────────────────
	function isLinkDisabled(): boolean {
		if (!editorState || !editorView) return true;
		return !createLink(editorState, null, editorView);
	}

	function handleLink() {
		if (!editorState || !editorView) return;
		const schema = editorState.schema;
		const url = prompt('Enter link URL', 'https://example.com');
		if (url) {
			toggleMark(schema.marks.link, { href: url })(editorState, editorView.dispatch);
			editorView.focus();
		}
	}

	// ── Image disabled ────────────────────────────────────────────────────────
	function isImageDisabled(): boolean {
		if (!editorState || !editorView) return true;
		return !insertImage(editorState, null, editorView);
	}
</script>

<svelte:window onkeydown={onKeyDown} />

{#if $isEditing}
<div class="sticky top-0 z-10 py-3 mb-6">
	<div
		class="max-w-screen-xl mx-auto px-3
		       bg-[rgba(13,13,18,0.92)] backdrop-blur-md
		       border border-[rgba(201,168,76,0.18)] rounded-xl shadow-lg"
	>
		<div class="flex items-center overflow-x-auto py-2 px-1 gap-1">

			{#if editorState && editorView}
				<!-- Bold -->
				<button
					type="button"
					disabled={isMarkDisabled('strong')}
					onclick={() => handleToggleMark('strong')}
					class={btnClass(isMarkActive('strong'), isMarkDisabled('strong'))}
					title="Bold"
				>
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512">
						<path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/>
					</svg>
				</button>

				<!-- Italic -->
				<button
					type="button"
					disabled={isMarkDisabled('em')}
					onclick={() => handleToggleMark('em')}
					class={btnClass(isMarkActive('em'), isMarkDisabled('em'))}
					title="Italic"
				>
					<svg class="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
						<path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/>
					</svg>
				</button>

				<!-- Link -->
				<button
					type="button"
					disabled={isLinkDisabled()}
					onclick={handleLink}
					class={btnClass(false, isLinkDisabled())}
					title="Link"
				>
					<svg class="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
						<path d="M562.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L405.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C189.5 251.2 196 330 246 380c56.5 56.5 148 56.5 204.5 0L562.8 267.7zM43.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C57 372 57 321 88.5 289.5L200.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C416.5 260.8 410 182 360 132c-56.5-56.5-148-56.5-204.5 0L43.2 244.3z"/>
					</svg>
				</button>

				<!-- Divider -->
				<div class="w-px bg-[rgba(201,168,76,0.2)] self-stretch mx-1"></div>

				<!-- H2 -->
				<button
					type="button"
					disabled={isHeadingDisabled()}
					onclick={() => handleToggleHeading(2)}
					class={btnClass(isHeadingActive(2), isHeadingDisabled())}
					title="Heading 2"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
						<path d="M156,56V176a12,12,0,0,1-24,0V128H52v48a12,12,0,0,1-24,0V56a12,12,0,0,1,24,0v48h80V56a12,12,0,0,1,24,0Zm84,140H216l28.74-38.33A36,36,0,1,0,182.05,124a12,12,0,0,0,22.63,8,11.67,11.67,0,0,1,1.73-3.22,12,12,0,1,1,19.15,14.46L182.4,200.8A12,12,0,0,0,192,220h48a12,12,0,0,0,0-24Z"/>
					</svg>
				</button>

				<!-- H3 -->
				<button
					type="button"
					disabled={isHeadingDisabled()}
					onclick={() => handleToggleHeading(3)}
					class={btnClass(isHeadingActive(3), isHeadingDisabled())}
					title="Heading 3"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
						<path d="M252,180a40,40,0,0,1-68.57,28,12,12,0,1,1,17.14-16.79A16,16,0,1,0,212,164a12,12,0,0,1-9.83-18.88L217,124H192a12,12,0,0,1,0-24h48a12,12,0,0,1,9.83,18.88l-18.34,26.2A40,40,0,0,1,252,180ZM144,44a12,12,0,0,0-12,12v48H52V56a12,12,0,0,0-24,0V176a12,12,0,0,0,24,0V128h80v48a12,12,0,0,0,24,0V56A12,12,0,0,0,144,44Z"/>
					</svg>
				</button>

				<!-- Blockquote -->
				<button
					type="button"
					disabled={isBlockquoteDisabled()}
					onclick={handleBlockquote}
					class={btnClass(false, isBlockquoteDisabled())}
					title="Blockquote"
				>
					<svg class="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
					</svg>
				</button>

				<!-- Divider -->
				<div class="w-px bg-[rgba(201,168,76,0.2)] self-stretch mx-1"></div>

				<!-- Bullet list -->
				<button
					type="button"
					disabled={isBulletListDisabled()}
					onclick={handleBulletList}
					class={btnClass(false, isBulletListDisabled())}
					title="Bullet list"
				>
					<svg class="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/>
					</svg>
				</button>

				<!-- Ordered list -->
				<button
					type="button"
					disabled={isOrderedListDisabled()}
					onclick={handleOrderedList}
					class={btnClass(false, isOrderedListDisabled())}
					title="Ordered list"
				>
					<svg class="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
					</svg>
				</button>

				<!-- Divider -->
				<div class="w-px bg-[rgba(201,168,76,0.2)] self-stretch mx-1"></div>

				<!-- Insert Image -->
				<button
					type="button"
					disabled={isImageDisabled()}
					onclick={openUploadModal}
					class={btnClass(false, isImageDisabled())}
					title="Insert image"
				>
					<svg class="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
					</svg>
				</button>
			{/if}

			<!-- Spacer -->
			<div class="ml-auto flex items-center gap-2">
				<button
					type="button"
					onclick={handleCancel}
					class="px-4 py-1.5 rounded-full text-sm font-semibold
					       text-[#FAF8F5] border border-[rgba(201,168,76,0.25)]
					       hover:bg-[rgba(201,168,76,0.08)] transition-colors"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={handleSave}
					class="px-4 py-1.5 rounded-full text-sm font-semibold
					       bg-[#C9A84C] text-[#0D0D12]
					       hover:bg-[#d4b460] transition-colors"
				>
					Save
				</button>
			</div>
		</div>
	</div>
</div>
{/if}

<!-- Upload Image Modal -->
{#if showUploadModal}
	{#await import('./UploadImageModal.svelte') then ModalModule}
		<ModalModule.default
			onsave={handleImageSave}
			onclose={() => (showUploadModal = false)}
		/>
	{/await}
{/if}
