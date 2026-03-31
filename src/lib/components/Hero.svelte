<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="hero">
	<div class="hero-centered">
		<span class="hero-kicker cascade cascade--0">{i.heroKicker}</span>
		<h1 class="hero-title cascade cascade--1">
			{i.heroTitle1} <em>{i.heroTitle2}</em>
		</h1>
		<p class="hero-sub cascade cascade--2">
			{i.heroSub}
		</p>
		<div class="hero-actions cascade cascade--3">
			<a
				class="btn-hero-primary"
				href="https://thalx.io"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="btn-hero-pulse" aria-hidden="true"></span>
				<span class="btn-hero-text">{i.heroCta}</span>
				<svg class="btn-hero-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
			<a
				class="btn-hero-secondary"
				href="https://ai4managers.net"
				target="_blank"
				rel="noopener noreferrer"
			>
				{i.heroCtaSecondary}
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 140px 0 64px;
	}

	.hero-centered {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 820px;
		margin-bottom: 56px;
	}

	.hero-kicker {
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 20px;
		border: 1px solid var(--gold-border);
		padding: 6px 16px;
		border-radius: 20px;
		background: rgba(201, 168, 76, 0.07);
	}

	.hero-title {
		font-family: var(--display);
		font-size: clamp(48px, 6vw, 72px);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--text);
		margin: 0 0 28px;
		text-align: center;
	}

	.hero-title em {
		font-style: italic;
		background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--gold) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}

	.hero-title em::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -4px;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, var(--accent), var(--gold));
		border-radius: 2px;
		opacity: 0.6;
	}

	.hero-sub {
		font-size: 22px;
		line-height: 1.8;
		color: var(--text-muted);
		margin: 0 0 40px;
		font-weight: 500;
		max-width: 640px;
		text-align: center;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		justify-content: center;
	}

	/* Primary CTA */
	.btn-hero-primary {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 12px;
		background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 50%, var(--gold) 100%);
		background-size: 200% 200%;
		animation: gradientShift 4s ease infinite;
		color: #fff;
		font-family: 'Syne', sans-serif;
		font-weight: 700;
		font-size: 20px;
		padding: 18px 36px;
		border-radius: 12px;
		text-decoration: none;
		letter-spacing: -0.01em;
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
		box-shadow: 0 0 0 0 rgba(99, 102, 241, 0), 0 8px 32px rgba(99, 102, 241, 0.3), 0 0 60px rgba(201, 168, 76, 0.1);
		overflow: hidden;
	}

	.btn-hero-primary:hover {
		transform: translateY(-3px) scale(1.03);
		box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 12px 48px rgba(99, 102, 241, 0.4), 0 0 80px rgba(201, 168, 76, 0.15);
		color: #fff;
	}

	.btn-hero-primary:active {
		transform: translateY(0) scale(0.98);
	}

	.btn-hero-pulse {
		position: absolute;
		inset: -2px;
		border-radius: 14px;
		background: linear-gradient(135deg, var(--accent), var(--gold));
		opacity: 0;
		z-index: -1;
		animation: heroPulse 2.5s ease-in-out infinite;
	}

	.btn-hero-text { position: relative; z-index: 1; }

	.btn-hero-arrow {
		position: relative;
		z-index: 1;
		transition: transform 0.3s ease;
	}

	.btn-hero-primary:hover .btn-hero-arrow {
		transform: translateX(4px);
	}

	/* Secondary CTA */
	.btn-hero-secondary {
		display: inline-flex;
		align-items: center;
		font-family: 'Syne', sans-serif;
		font-weight: 600;
		font-size: 18px;
		color: var(--text-muted);
		text-decoration: none;
		padding: 18px 28px;
		border-radius: 12px;
		border: 1px solid var(--border);
		transition: color 0.2s, border-color 0.2s, background 0.2s;
		letter-spacing: -0.01em;
	}

	.btn-hero-secondary:hover {
		color: var(--text);
		border-color: var(--accent);
		background: rgba(99, 102, 241, 0.06);
	}

	@media (max-width: 640px) {
		.hero { padding: 100px 0 40px; }
		.hero-title { font-size: clamp(32px, 7vw, 48px) !important; }
		.hero-sub { font-size: 17px; }
		.hero-actions { flex-direction: column; align-items: stretch; }
		.btn-hero-primary { font-size: 18px; padding: 16px 24px; justify-content: center; }
		.btn-hero-secondary { font-size: 16px; padding: 14px 24px; text-align: center; justify-content: center; }
	}
</style>
