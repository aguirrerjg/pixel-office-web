<script lang="ts">
	import { onMount } from 'svelte';
	import { lang } from '$lib/i18n/store.js';
	import { theme } from '$lib/stores/theme.js';

	let navEl: HTMLElement;

	onMount(() => {
		const handleScroll = () => {
			if (navEl) {
				if (window.scrollY > 60) {
					navEl.classList.add('nav--scrolled');
				} else {
					navEl.classList.remove('nav--scrolled');
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="nav" bind:this={navEl}>
	<span class="logo">
		<span class="logo-pixel">AS</span>
		<span class="logo-name">Agent Squad</span>
	</span>
	<div class="nav-right">
		<a class="blog-link" href="/{$lang}/blog">Blog</a>
		<button class="lang-toggle" onclick={() => lang.toggle()} aria-label="Toggle language">
			{$lang === 'es' ? 'EN' : 'ES'}
		</button>
		<button class="theme-toggle" onclick={() => theme.toggle()} aria-label="Toggle theme">
			{#if $theme === 'dark'}
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.17 3.17l1.06 1.06M11.77 11.77l1.06 1.06M3.17 12.83l1.06-1.06M11.77 4.23l1.06-1.06" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
			{:else}
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 9.5A6.5 6.5 0 016.5 2 5.5 5.5 0 1014 9.5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
			{/if}
		</button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 3px;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px max(24px, calc((100vw - 1120px) / 2 + 24px));
		z-index: 50;
		transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
		background: transparent;
		border-bottom: 1px solid transparent;
		animation: fadeDown 0.6s ease both;
	}

	:global(.nav--scrolled) {
		background: rgba(7, 7, 15, 0.72) !important;
		backdrop-filter: blur(20px) saturate(1.4);
		-webkit-backdrop-filter: blur(20px) saturate(1.4);
		border-bottom: 1px solid var(--border) !important;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
	}

	:global([data-theme="light"] .nav--scrolled) {
		background: rgba(248, 247, 244, 0.85) !important;
		border-bottom: 1px solid rgba(99, 102, 241, 0.1) !important;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.logo-pixel {
		font-family: var(--mono);
		font-weight: 500;
		font-size: 18px;
		background: var(--accent);
		color: #fff;
		padding: 3px 7px;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}

	.logo-name {
		font-weight: 700;
		font-size: 24px;
		letter-spacing: -0.01em;
		color: var(--text);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.blog-link {
		font-family: var(--mono);
		font-size: 14px;
		font-weight: 600;
		color: var(--gold);
		text-decoration: none;
		padding: 8px 16px;
		border-radius: 10px;
		border: 2px solid var(--gold);
		background: var(--gold-dim);
		transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
		box-shadow: 0 0 8px rgba(201, 168, 76, 0.12);
		letter-spacing: 0.04em;
	}

	.blog-link:hover {
		background: rgba(201, 168, 76, 0.22);
		box-shadow: 0 0 16px rgba(201, 168, 76, 0.2);
		transform: scale(1.05);
	}

	.lang-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: 10px;
		border: 2px solid var(--gold);
		background: var(--gold-dim);
		color: var(--gold);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.04em;
		transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
		box-shadow: 0 0 8px rgba(201, 168, 76, 0.12);
	}

	.lang-toggle:hover {
		background: rgba(201, 168, 76, 0.22);
		border-color: var(--gold);
		box-shadow: 0 0 16px rgba(201, 168, 76, 0.2);
		transform: scale(1.05);
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: 10px;
		border: 2px solid var(--gold);
		background: var(--gold-dim);
		color: var(--gold);
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
		box-shadow: 0 0 8px rgba(201, 168, 76, 0.12);
	}

	.theme-toggle:hover {
		background: rgba(201, 168, 76, 0.22);
		border-color: var(--gold);
		box-shadow: 0 0 16px rgba(201, 168, 76, 0.2);
		transform: scale(1.05);
	}

	@media (max-width: 640px) {
		.nav { padding: 14px 16px; }
		.logo-name { font-size: 18px; }
	}
</style>
