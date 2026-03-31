<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();

	const stepIcons = ['🎯', '⚙️', '📈'];
</script>

<section class="how-it-works" id="how-it-works">
	<div class="section-label">{i.howItWorksLabel}</div>
	<h2 class="section-heading">{i.howItWorksHeading}</h2>

	<div class="steps-row">
		<!-- Step 1 -->
		<div class="step-card cascade cascade--1">
			<div class="step-icon">{stepIcons[0]}</div>
			<div class="step-num">{i.step1Num}</div>
			<h3 class="step-title">{i.step1Title}</h3>
			<p class="step-desc">{i.step1Desc}</p>
		</div>

		<!-- Arrow -->
		<div class="step-arrow" aria-hidden="true">
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
				<path d="M6 16h20M20 10l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>

		<!-- Step 2 -->
		<div class="step-card cascade cascade--2">
			<div class="step-icon">{stepIcons[1]}</div>
			<div class="step-num">{i.step2Num}</div>
			<h3 class="step-title">{i.step2Title}</h3>
			<p class="step-desc">{i.step2Desc}</p>
		</div>

		<!-- Arrow -->
		<div class="step-arrow" aria-hidden="true">
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
				<path d="M6 16h20M20 10l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>

		<!-- Step 3 -->
		<div class="step-card cascade cascade--3">
			<div class="step-icon">{stepIcons[2]}</div>
			<div class="step-num">{i.step3Num}</div>
			<h3 class="step-title">{i.step3Title}</h3>
			<p class="step-desc">{i.step3Desc}</p>
		</div>
	</div>
</section>

<style>
	.how-it-works {
		padding: 80px 0 64px;
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
		margin: 0 0 56px;
		letter-spacing: -0.02em;
	}

	.steps-row {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.step-card {
		flex: 1;
		background: var(--bg2);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 36px 28px;
		text-align: left;
		position: relative;
		overflow: hidden;
		transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
	}

	.step-card:hover {
		border-color: var(--gold-border);
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(201, 168, 76, 0.08);
	}

	.step-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--accent), transparent);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.step-card:hover::before { opacity: 1; }

	.step-icon {
		font-size: 36px;
		margin-bottom: 12px;
		line-height: 1;
	}

	.step-num {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		color: var(--gold);
		text-transform: uppercase;
		margin-bottom: 12px;
	}

	.step-title {
		font-family: var(--display);
		font-size: 24px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 12px;
		letter-spacing: -0.01em;
	}

	.step-desc {
		font-size: 16px;
		line-height: 1.7;
		color: var(--text-muted);
		margin: 0;
	}

	.step-arrow {
		flex-shrink: 0;
		color: var(--gold);
		opacity: 0.6;
	}

	:global([data-theme="light"]) .step-card {
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
	}

	@media (max-width: 768px) {
		.steps-row {
			flex-direction: column;
			align-items: stretch;
		}
		.step-arrow {
			transform: rotate(90deg);
			align-self: center;
		}
		.step-card {
			text-align: center;
		}
		.step-icon { font-size: 28px; }
		.step-title { font-size: 20px; }
		.step-desc { font-size: 15px; }
	}
</style>
