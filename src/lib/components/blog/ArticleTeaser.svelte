<script lang="ts">
	import { formatDate } from '$lib/util';

	let { article, asReadNext = false }: {
		article: any;
		asReadNext?: boolean;
	} = $props();
</script>

<div class="group">
	<div class="grid {asReadNext ? 'md:grid-cols-12 items-center' : 'grid-cols-1'} gap-4 md:gap-5">
		<a href="/blog/{article.slug}" class="inline-block {asReadNext ? 'md:col-span-6' : ''}">
			{#if article.thumbnail}
				<img
					src={article.thumbnail}
					alt={article.title}
					loading="lazy"
					width="1280"
					height="720"
					class="w-full aspect-video object-cover rounded-lg border border-[var(--border)]"
				/>
			{:else}
				<div class="w-full aspect-video bg-[var(--bg2)] rounded-lg border border-[var(--border)] flex items-center justify-center">
					<span class="text-[var(--text-muted)]">Sin imagen</span>
				</div>
			{/if}
		</a>
		<div class="{asReadNext ? 'md:col-span-6' : ''}" class:opacity-50={!article.published_at}>
			<span class="inline-flex items-center gap-2 text-[var(--text-muted)]">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<span class="text-sm md:text-lg font-medium">{formatDate(article.published_at ?? new Date())}</span>
			</span>
			<div>
				<a class="inline-block my-1" href="/blog/{article.slug}">
					<h2 class="text-2xl md:text-3xl font-semibold text-[var(--text)] hover:text-[var(--gold)] transition-colors">
						{article.title}
					</h2>
				</a>
			</div>
			<div class="pt-1 pb-2">
				<a href="/blog/{article.slug}" class="line-clamp-3 text-base text-[var(--text-muted)]">
					{article.teaser}
				</a>
			</div>
			<a class="text-[var(--gold)] font-semibold text-lg w-fit hover:underline" href="/blog/{article.slug}">
				<span>
					Leer más
					<span class="sr-only">- {article.title}</span>
					<span class="inline-block ml-1 group-hover:ml-3 transition-all" aria-hidden="true">&rarr;</span>
				</span>
			</a>
		</div>
	</div>
</div>
