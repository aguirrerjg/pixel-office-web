<script lang="ts">
	/**
	 * Image upload + crop modal.
	 * Uses cropperjs (web components API) — loaded client-side via $effect.
	 * No Skeleton UI dependency.
	 */
	import type { CropperCanvas, CropperSelection } from 'cropperjs';

	// ── Props ─────────────────────────────────────────────────────────────────
	let {
		freeSize = false,
		showAlt = false,
		onsave,
		onclose
	}: {
		freeSize?: boolean;
		showAlt?: boolean;
		onsave?: (result: { croppedImageUrl: string; imageAsBlob: Blob; alt: string }) => void;
		onclose?: () => void;
	} = $props();

	// ── State ─────────────────────────────────────────────────────────────────
	let src = $state<string | null>(null);
	let alt = $state<string>('');
	let cropper = $state<CropperCanvas | undefined>(undefined);
	let selection = $state<CropperSelection | undefined>(undefined);
	let croppedImageUrl = $state<string | null>(null);
	let cropperLoaded = $state(false);

	// Load cropperjs web components on mount (client-only)
	$effect(() => {
		import('cropperjs').then(() => {
			cropperLoaded = true;
		});
	});

	// ── File input ────────────────────────────────────────────────────────────
	function onChangeHandler(e: Event) {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (!files || files.length === 0) return;

		const file = files[0];
		const fileReader = new FileReader();
		fileReader.onload = () => {
			if (fileReader.result) src = fileReader.result as string;
		};
		fileReader.readAsDataURL(file);
	}

	// ── Drag & drop ───────────────────────────────────────────────────────────
	function onDrop(e: DragEvent) {
		e.preventDefault();
		const file = e.dataTransfer?.files?.[0];
		if (!file || !file.type.startsWith('image/')) return;
		const fileReader = new FileReader();
		fileReader.onload = () => {
			if (fileReader.result) src = fileReader.result as string;
		};
		fileReader.readAsDataURL(file);
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
	}

	// ── Save ──────────────────────────────────────────────────────────────────
	async function saveChanges() {
		if (!selection) return;
		const selectionCanvas = await selection.$toCanvas({ width: 500, height: 500 });
		croppedImageUrl = selectionCanvas.toDataURL();
		selectionCanvas.toBlob((blob) => {
			if (blob) {
				onsave?.({ croppedImageUrl: croppedImageUrl!, imageAsBlob: blob, alt });
			}
		}, 'image/png');
	}

	// ── Keyboard close ────────────────────────────────────────────────────────
	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose?.();
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<!-- Backdrop -->
<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
	onclick={(e) => { if (e.target === e.currentTarget) onclose?.(); }}
	role="dialog"
	aria-modal="true"
	aria-label="Upload image"
>
	<div class="relative bg-[#0D0D12] border border-[rgba(201,168,76,0.2)] rounded-xl
	            max-w-xl w-full mx-4 p-5 space-y-4 shadow-2xl">

		<!-- Close button -->
		<button
			type="button"
			onclick={() => onclose?.()}
			class="absolute top-3 right-3 p-1.5 rounded-full
			       text-[rgba(250,248,245,0.5)] hover:text-[#FAF8F5]
			       hover:bg-[rgba(201,168,76,0.1)] transition-colors"
			aria-label="Close"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
			</svg>
		</button>

		<h3 class="text-[#C9A84C] font-semibold text-lg font-['JetBrains_Mono',monospace]">
			Upload Image
		</h3>

		{#if !src}
			<!-- Drop zone -->
			<label
				class="block border-2 border-dashed border-[rgba(201,168,76,0.25)] rounded-xl
				       px-6 py-10 text-center cursor-pointer
				       hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.04)]
				       transition-colors"
				ondrop={onDrop}
				ondragover={onDragOver}
			>
				<input
					type="file"
					accept="image/*"
					class="sr-only"
					onchange={onChangeHandler}
				/>
				<svg class="h-10 w-10 mx-auto mb-3 text-[rgba(201,168,76,0.5)]" fill="currentColor" viewBox="0 0 512 512">
					<path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
				</svg>
				<p class="text-[rgba(250,248,245,0.7)] font-medium">
					<span class="text-[#C9A84C]">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-[rgba(250,248,245,0.4)] mt-1">Only images are accepted</p>
			</label>
		{/if}

		{#if src}
			{#if showAlt}
				<input
					type="text"
					bind:value={alt}
					placeholder="Alt text (describe the image)"
					class="w-full bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.18)]
					       rounded-lg px-3 py-2 text-[#FAF8F5] text-sm placeholder:text-[rgba(250,248,245,0.3)]
					       focus:outline-none focus:border-[rgba(201,168,76,0.5)]"
				/>
			{/if}

			{#if cropperLoaded}
				<!-- Cropperjs web components -->
				<div class="rounded-xl overflow-hidden aspect-video bg-black">
					<!-- @ts-ignore — custom elements -->
					<cropper-canvas bind:this={cropper} style="width:100%;height:100%;">
						<cropper-image {src} crossorigin="anonymous" rotatable={false} skewable={false}></cropper-image>
						<cropper-shade hidden></cropper-shade>
						<cropper-handle action="move" plain></cropper-handle>
						<cropper-selection
							initial-coverage="0.985"
							outlined
							precise
							movable={freeSize}
							resizable={freeSize}
							keyboard={true}
							bind:this={selection}
						>
							<cropper-grid role="grid" bordered covered></cropper-grid>
							<cropper-crosshair theme-color="rgba(238,238,238,0)" centered></cropper-crosshair>
							<cropper-handle action="move" theme-color="rgba(255,255,255,0)"></cropper-handle>
							<cropper-handle action="n-resize"></cropper-handle>
							<cropper-handle action="e-resize"></cropper-handle>
							<cropper-handle action="s-resize"></cropper-handle>
							<cropper-handle action="w-resize"></cropper-handle>
							<cropper-handle action="ne-resize"></cropper-handle>
							<cropper-handle action="nw-resize"></cropper-handle>
							<cropper-handle action="se-resize"></cropper-handle>
							<cropper-handle action="sw-resize"></cropper-handle>
						</cropper-selection>
					</cropper-canvas>
				</div>
			{:else}
				<div class="rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center">
					<p class="text-[rgba(250,248,245,0.4)] text-sm">Loading cropper...</p>
				</div>
			{/if}

			<div class="flex items-center justify-end gap-3">
				<button
					type="button"
					onclick={() => (src = null)}
					class="px-4 py-2 rounded-full text-sm font-semibold
					       text-[#FAF8F5] border border-[rgba(201,168,76,0.25)]
					       hover:bg-[rgba(201,168,76,0.08)] transition-colors"
				>
					Change image
				</button>
				<button
					type="button"
					onclick={saveChanges}
					class="px-4 py-2 rounded-full text-sm font-semibold
					       bg-[#C9A84C] text-[#0D0D12]
					       hover:bg-[#d4b460] transition-colors"
				>
					Save changes
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(cropper-canvas) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
