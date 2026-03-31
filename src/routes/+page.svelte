<script lang="ts">
	import { lang } from '$lib/i18n/store.js';
	import { t } from '$lib/i18n/translations.js';
	import { formatDate } from '$lib/util.js';
	import Hero from '$lib/components/Hero.svelte';
	import Showcase from '$lib/components/Showcase.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Features from '$lib/components/Features.svelte';
	import Quote from '$lib/components/Quote.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
	let i = $derived(t[$lang]);
	let posts = $derived($lang === 'es' ? data.articlesEs : data.articles);
</script>

<Hero {i} />
<Showcase {i} />
<Stats {i} />
<Features {i} />
<Quote {i} />

<!-- Blog Teaser -->
{#if posts && posts.length > 0}
<section style="padding: 5rem 0; position: relative; overflow: hidden;">
	<div style="position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 600px; background: radial-gradient(ellipse at center, rgba(99,102,241,0.09) 0%, transparent 65%); pointer-events: none;"></div>
	<div style="max-width: 1140px; margin: 0 auto; padding: 0 1.5rem; position: relative; display: flex; flex-direction: column; gap: 3rem;">
		<div style="text-align: center;">
			<p style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.28em; color: var(--gold, #c9a55a); font-weight: 600;">Blog</p>
			<h2 style="margin-top: 0.75rem; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; font-family: 'Playfair Display', serif; color: var(--text, #fff); line-height: 1.2;">
				{$lang === 'es' ? 'Últimas publicaciones' : 'Latest posts'}
			</h2>
		</div>

		<div class="blog-teaser-grid" style="display: grid; gap: 1.5rem;">
			{#each posts as article}
				<a href="/{$lang}/blog/{article.slug}" style="display: flex; flex-direction: column; overflow: hidden; border-radius: 1rem; border: 1px solid var(--border, rgba(255,255,255,0.08)); background: var(--bg2, rgba(255,255,255,0.03)); transition: transform 0.25s ease, box-shadow 0.25s ease; text-decoration: none; color: inherit;">
					<div style="height: 180px; position: relative; overflow: hidden; flex-shrink: 0; background: linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.45) 50%, rgba(167,139,250,0.3) 100%);">
						{#if article.thumbnail}
							<img src={article.thumbnail} alt={article.title} loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
						{/if}
					</div>
					<div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1;">
						<span style="font-size: 0.75rem; color: var(--text-muted, rgba(255,255,255,0.5));">{formatDate(article.published_at ?? new Date())}</span>
						<h3 style="font-size: 1rem; font-weight: 600; color: var(--text, #fff); font-family: 'Space Grotesk', sans-serif; line-height: 1.4;">
							{article.title}
						</h3>
						{#if article.teaser}
							<p style="font-size: 0.875rem; color: var(--text-muted, rgba(255,255,255,0.5)); line-height: 1.6; flex: 1;">
								{article.teaser.length > 120 ? article.teaser.slice(0, 120) + '…' : article.teaser}
							</p>
						{/if}
						<span style="font-size: 0.8125rem; font-weight: 500; color: var(--gold, #c9a55a); display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 0.5rem;">
							{$lang === 'es' ? 'Leer más' : 'Read more'} →
						</span>
					</div>
				</a>
			{/each}
		</div>

		<div style="text-align: center;">
			<a href="/{$lang}/blog" style="display: inline-flex; align-items: center; gap: 0.625rem; border-radius: 0.75rem; border: 1px solid var(--border, rgba(255,255,255,0.08)); padding: 0.75rem 1.75rem; font-size: 0.9375rem; font-weight: 600; color: var(--text, #fff); text-decoration: none; transition: background 0.2s ease, border-color 0.2s ease;">
				{$lang === 'es' ? 'Ver todos los artículos' : 'See all articles'} →
			</a>
		</div>
	</div>

	<style>
		.blog-teaser-grid { grid-template-columns: 1fr; }
		@media (min-width: 640px) { .blog-teaser-grid { grid-template-columns: repeat(2, 1fr); } }
		@media (min-width: 1024px) { .blog-teaser-grid { grid-template-columns: repeat(3, 1fr); } }
		.blog-teaser-grid a:hover { transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,0,0,0.3); }
	</style>
</section>
{/if}

<CtaSection {i} />
<Footer />
