<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="features">
	<div class="feature-card" style="--card-delay: 0s">
		<div class="feature-glow" aria-hidden="true"></div>
		<div class="feature-icon">◉</div>
		<h3>{i.feat1t}</h3>
		<p>{i.feat1p}</p>
	</div>
	<div class="feature-card feature-card--accent" style="--card-delay: 0.1s">
		<div class="feature-glow" aria-hidden="true"></div>
		<div class="feature-icon">✈</div>
		<h3>{i.feat2t}</h3>
		<p>{i.feat2p}</p>
	</div>
	<div class="feature-card" style="--card-delay: 0.2s">
		<div class="feature-glow" aria-hidden="true"></div>
		<div class="feature-icon">⬡</div>
		<h3>{i.feat3t}</h3>
		<p>{i.feat3p}</p>
	</div>
	<div class="feature-card" style="--card-delay: 0.3s">
		<div class="feature-glow" aria-hidden="true"></div>
		<div class="feature-icon">⚡</div>
		<h3>{i.feat4t}</h3>
		<p>{i.feat4p}</p>
	</div>
</section>

<style>
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
		margin-bottom: 96px;
	}

	.feature-card {
		background: var(--bg2);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 32px 28px;
		position: relative;
		overflow: hidden;
		opacity: 0;
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(1.3s + var(--card-delay, 0s));
		transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
	}

	.feature-glow {
		position: absolute;
		inset: -1px;
		border-radius: 12px;
		opacity: 0;
		transition: opacity 0.4s ease;
		background: radial-gradient(circle at 50% 0%, var(--gold-glow) 0%, transparent 60%);
		pointer-events: none;
		z-index: 0;
	}

	.feature-card:hover .feature-glow { opacity: 1; }

	.feature-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--gold), transparent);
		opacity: 0;
		transition: opacity 0.35s;
		z-index: 1;
	}

	.feature-card:hover {
		border-color: var(--gold-border);
		box-shadow: 0 8px 40px rgba(201, 168, 76, 0.08), 0 0 0 1px var(--gold-border);
		transform: translateY(-4px);
	}

	.feature-card:hover::before { opacity: 1; }

	.feature-card--accent {
		background: linear-gradient(135deg, #0d0b1a 0%, rgba(201, 168, 76, 0.06) 100%);
		border-color: var(--gold-border);
	}

	.feature-icon {
		font-size: 34px;
		margin-bottom: 16px;
		color: var(--gold);
		line-height: 1;
		position: relative;
		z-index: 1;
	}

	.feature-card h3 {
		font-size: 25px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 10px;
		letter-spacing: -0.01em;
		position: relative;
		z-index: 1;
	}

	.feature-card p {
		font-size: 20px;
		line-height: 1.75;
		color: var(--text-muted);
		margin: 0;
		font-weight: 500;
		position: relative;
		z-index: 1;
	}

	:global([data-theme="light"]) .feature-card {
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
	}

	:global([data-theme="light"]) .feature-card--accent {
		background: linear-gradient(135deg, #ffffff 0%, rgba(154, 125, 46, 0.04) 100%);
	}

	@media (max-width: 1024px) { .features { grid-template-columns: repeat(2, 1fr); } }

	@media (max-width: 640px) {
		.features { grid-template-columns: 1fr; }
		.feature-card h3 { font-size: 20px; }
		.feature-card p { font-size: 17px; }
	}
</style>
