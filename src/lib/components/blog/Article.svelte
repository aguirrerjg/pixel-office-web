<script lang="ts">
	import PlainText from '$lib/components/blog/PlainText.svelte';
	import RichText from '$lib/components/blog/RichText.svelte';
	import { isEditing } from '$lib/stores';
	import { uploadImage } from '$lib/uploadAsset';
	import { formatDate, nanoid } from '$lib/util';

	let {
		title = $bindable(''),
		teaser = $bindable(''),
		content = $bindable(''),
		thumbnail = $bindable(''),
		thumbnailId = $bindable(''),
		published_at
	}: {
		title?: string;
		teaser?: string;
		content?: string;
		thumbnail?: string;
		thumbnailId?: string;
		published_at?: Date | null;
	} = $props();

	let thumbnailUploading = $state(false);
	let showUploadModal = $state(false);

	async function handleThumbnailSave(result: { croppedImageUrl: string; imageAsBlob: Blob; alt: string }) {
		showUploadModal = false;
		const path = 'thumbnail__' + nanoid() + '.png';
		thumbnailUploading = true;
		const res = await uploadImage(path, result.imageAsBlob);
		thumbnailUploading = false;
		thumbnail = res.src;
		if (res.fileId) thumbnailId = res.fileId;
	}
</script>

<div class="grid md:grid-cols-2 items-center gap-8">
	<div>
		{#if !published_at}
			<div class="font-bold text-sm uppercase text-[var(--gold)] font-[var(--mono)]">DRAFT</div>
		{/if}
		{#if published_at}
			<span class="inline-flex items-center gap-2 text-[var(--text-muted)]">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<span class="text-lg font-medium">{formatDate(published_at)}</span>
			</span>
		{/if}
		<h1 class="text-4xl font-bold font-[var(--display)] text-[var(--text)] my-2">
			<PlainText bind:content={title} />
		</h1>
		<p class="text-xl text-[var(--text-muted)] font-medium my-3">
			<PlainText bind:content={teaser} />
		</p>
	</div>
	<div class="relative">
		{#if thumbnail}
			<button
				type="button"
				class="w-full cursor-pointer border-0 bg-transparent p-0"
				onclick={() => { if ($isEditing) showUploadModal = true; }}
			>
				<img src={thumbnail} alt={title} class="w-full aspect-video object-cover rounded-lg border border-[var(--border)]" />
			</button>
		{:else}
			<button
				type="button"
				class="w-full aspect-video bg-[var(--bg2)] rounded-lg border border-[var(--border)] flex items-center justify-center cursor-pointer"
				onclick={() => { if ($isEditing) showUploadModal = true; }}
			>
				<span class="text-[var(--text-muted)]">Click to add thumbnail</span>
			</button>
		{/if}
		{#if thumbnailUploading}
			<div class="absolute inset-0 w-full h-full grid place-items-center bg-black/50 rounded-lg">
				<div class="w-8 h-8 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
			</div>
		{/if}
	</div>
</div>

<hr class="border-[var(--border)] mt-6 md:mt-12" />

<div id="article_content" class="max-w-screen-md mx-auto my-6">
	<RichText multiLine bind:content />
</div>

{#if showUploadModal}
	{#await import('./UploadImageModal.svelte') then ModalModule}
		<ModalModule.default
			showAlt={false}
			onsave={handleThumbnailSave}
			onclose={() => (showUploadModal = false)}
		/>
	{/await}
{/if}
