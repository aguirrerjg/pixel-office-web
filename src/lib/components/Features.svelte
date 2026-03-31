<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="flavors" id="flavors">
	<div class="section-label">{i.flavorsLabel}</div>
	<h2 class="section-heading">{i.flavorsHeading}</h2>
	<p class="section-sub">{i.flavorsSub}</p>

	<div class="flavors-grid">
		<!-- Flavor 1: LIVE -->
		<div class="flavor-card flavor-card--live" style="--card-delay: 0s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="flavor-header">
				<span class="flavor-icon">{i.flavor1Icon}</span>
				<div class="flavor-badges">
					<span class="flavor-badge flavor-badge--live">{i.flavor1StatusLabel}</span>
					<span class="product-name">Thalx</span>
				</div>
			</div>
			<h3>{i.flavor1Title}</h3>
			<p>{i.flavor1Desc}</p>
			<a
				class="flavor-cta"
				href={i.flavor1Href}
				target="_blank"
				rel="noopener noreferrer"
			>
				{i.flavor1Cta}
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
					<path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>

		<!-- Flavor 2: Research -->
		<div class="flavor-card" style="--card-delay: 0.1s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="flavor-header">
				<span class="flavor-icon">{i.flavor2Icon}</span>
				<span class="flavor-badge flavor-badge--research">{i.flavor2StatusLabel}</span>
			</div>
			<h3>{i.flavor2Title}</h3>
			<p>{i.flavor2Desc}</p>
		</div>

		<!-- Flavor 3: Research -->
		<div class="flavor-card" style="--card-delay: 0.2s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="flavor-header">
				<span class="flavor-icon">{i.flavor3Icon}</span>
				<span class="flavor-badge flavor-badge--research">{i.flavor3StatusLabel}</span>
			</div>
			<h3>{i.flavor3Title}</h3>
			<p>{i.flavor3Desc}</p>
		</div>

		<!-- Flavor 4: Research -->
		<div class="flavor-card" style="--card-delay: 0.3s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="flavor-header">
				<span class="flavor-icon">{i.flavor4Icon}</span>
				<span class="flavor-badge flavor-badge--research">{i.flavor4StatusLabel}</span>
			</div>
			<h3>{i.flavor4Title}</h3>
			<p>{i.flavor4Desc}</p>
		</div>
	</div>
</section>

<style>
	.flavors {
		padding: 64px 0 80px;
		text-align: center;
	}

	.section-label {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 16px;
	}

	.section-heading {
		font-family: var(--display);
		font-size: clamp(32px, 4vw, 48px);
		font-weight: 800;
		color: var(--text);
		margin: 0 0 16px;
		letter-spacing: -0.02em;
	}

	.section-sub {
		font-size: 18px;
		line-height: 1.7;
		color: var(--text-muted);
		max-width: 600px;
		margin: 0 auto 48px;
	}

	.flavors-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
		text-align: left;
	}

	.flavor-card {
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

	.flavor-card:hover .feature-glow { opacity: 1; }

	.flavor-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--gold), transparent);
		opacity: 0;
		transition: opacity 0.35s;
		z-index: 1;
	}

	.flavor-card:hover {
		box-shadow: 0 8px 40px rgba(201, 168, 76, 0.08);
		transform: translateY(-4px);
	}

	.flavor-card:hover::before { opacity: 1; }

	/* Live card has a highlighted border always */
	.flavor-card--live {
		border-color: var(--gold-border);
		background: linear-gradient(135deg, var(--bg2) 0%, rgba(201, 168, 76, 0.04) 100%);
	}

	.flavor-card--live:hover {
		border-color: var(--gold);
		box-shadow: 0 8px 40px rgba(201, 168, 76, 0.12), 0 0 0 1px var(--gold-border);
	}

	.flavor-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
		position: relative;
		z-index: 1;
	}

	.flavor-icon {
		font-size: 32px;
		line-height: 1;
	}

	.flavor-badge {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 4px 12px;
		border-radius: 20px;
	}

	.flavor-badge--live {
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.35);
		background: rgba(34, 197, 94, 0.1);
	}

	.flavor-badge--research {
		color: var(--text-muted);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
	}

	.flavor-badges {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.product-name {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--gold);
		opacity: 0.7;
	}

	.flavor-card h3 {
		font-size: 22px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 10px;
		letter-spacing: -0.01em;
		position: relative;
		z-index: 1;
	}

	.flavor-card p {
		font-size: 16px;
		line-height: 1.75;
		color: var(--text-muted);
		margin: 0 0 20px;
		font-weight: 500;
		position: relative;
		z-index: 1;
	}

	.flavor-cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: 'Syne', sans-serif;
		font-size: 14px;
		font-weight: 700;
		color: var(--gold);
		text-decoration: none;
		letter-spacing: 0.01em;
		position: relative;
		z-index: 1;
		transition: gap 0.2s, opacity 0.2s;
	}

	.flavor-cta:hover {
		gap: 10px;
		opacity: 0.85;
	}

	:global([data-theme="light"]) .flavor-card {
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
	}

	:global([data-theme="light"]) .flavor-card--live {
		background: linear-gradient(135deg, #ffffff 0%, rgba(154, 125, 46, 0.04) 100%);
	}

	:global([data-theme="light"]) .flavor-badge--research {
		background: rgba(0, 0, 0, 0.04);
	}

	@media (max-width: 768px) {
		.flavors-grid { grid-template-columns: 1fr; }
	}

	@media (max-width: 640px) {
		.flavor-card h3 { font-size: 18px; }
		.flavor-card p { font-size: 15px; }
		.section-sub { font-size: 16px; }
	}
</style>
