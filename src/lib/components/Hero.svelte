<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="hero">
	<div class="hero-centered">
		<h1 class="hero-title cascade cascade--1">
			{i.heroTitle1} <em>{i.heroTitle2}</em>
		</h1>
		<p class="hero-sub cascade cascade--2">
			{i.heroSub}
		</p>
		<div class="hero-actions cascade cascade--3">
			<button class="btn-hero-cta" onclick={() => window.$crisp?.push(['do', 'chat:open'])}>
				<span class="btn-hero-pulse" aria-hidden="true"></span>
				<span class="btn-hero-text">{i.heroCta}</span>
				<svg class="btn-hero-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		</div>
		<a class="btn-hero-demo cascade cascade--4" href="https://app.agentsquadai.com/demo">
			<span class="demo-dot" aria-hidden="true"></span>
			<span class="demo-text">
				<span class="demo-main">{i.heroCtaDemo}</span>
				<span class="demo-sub">{i.heroCtaDemoSub}</span>
			</span>
		</a>
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
		font-size: 26px;
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
		gap: 20px;
	}

	.btn-hero-cta {
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
		font-size: 22px;
		padding: 20px 40px;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		letter-spacing: -0.01em;
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
		box-shadow: 0 0 0 0 rgba(99, 102, 241, 0), 0 8px 32px rgba(99, 102, 241, 0.3), 0 0 60px rgba(201, 168, 76, 0.1);
		overflow: hidden;
	}

	.btn-hero-cta:hover {
		transform: translateY(-3px) scale(1.03);
		box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 12px 48px rgba(99, 102, 241, 0.4), 0 0 80px rgba(201, 168, 76, 0.15);
	}

	.btn-hero-cta:active {
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

	.btn-hero-cta:hover .btn-hero-arrow {
		transform: translateX(4px);
	}

	/* ── Secondary CTA — link to live demo office ───────────────────── */
	.btn-hero-demo {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-top: 24px;
		padding: 14px 22px;
		background: rgba(201, 168, 76, 0.08);
		border: 1px solid rgba(201, 168, 76, 0.35);
		border-radius: 10px;
		color: var(--text);
		text-decoration: none;
		font-family: 'Syne', sans-serif;
		font-weight: 500;
		transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
		box-shadow: 0 4px 18px -8px rgba(201, 168, 76, 0.3);
	}
	.btn-hero-demo:hover {
		background: rgba(201, 168, 76, 0.16);
		border-color: rgba(201, 168, 76, 0.65);
		transform: translateY(-2px);
		box-shadow: 0 8px 28px -10px rgba(201, 168, 76, 0.5);
	}
	.demo-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--gold, #c9a84c);
		box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.7);
		animation: demoPulse 2s ease-out infinite;
		flex-shrink: 0;
	}
	@keyframes demoPulse {
		0% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.6); }
		70% { box-shadow: 0 0 0 12px rgba(201, 168, 76, 0); }
		100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0); }
	}
	.demo-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.2;
	}
	.demo-main {
		font-size: 15px;
		font-weight: 600;
		color: var(--text);
		letter-spacing: 0;
	}
	.demo-sub {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px;
		font-weight: 400;
		color: var(--text-muted);
		margin-top: 3px;
		letter-spacing: 0.04em;
	}

	@media (max-width: 640px) {
		.hero { padding: 100px 0 40px; }
		.hero-title { font-size: clamp(28px, 7vw, 42px) !important; }
		.hero-sub { font-size: 16px; }
		.hero-actions { flex-direction: column; align-items: stretch; }
		.btn-hero-cta { font-size: 18px; padding: 18px 28px; width: 100%; justify-content: center; }
	}
</style>
