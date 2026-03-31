<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="cta-section">
	<h2 class="cta-title">{i.ctaTitle}</h2>
	<p class="cta-sub">{i.ctaSub}</p>
	<button class="btn-primary btn-primary--large" onclick={() => window.$crisp?.push(['do', 'chat:open'])}>{i.ctaBtn}</button>
</section>

<style>
	.cta-section {
		text-align: center;
		padding: 80px 0;
		opacity: 0;
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.1s forwards;
	}

	.cta-title {
		font-family: var(--display);
		font-size: clamp(40px, 6vw, 64px);
		font-weight: 800;
		color: var(--text);
		margin: 0 0 36px;
		letter-spacing: -0.02em;
	}

	.cta-sub {
		font-size: 24px;
		color: var(--text-muted);
		margin: 0 0 32px;
		line-height: 1.7;
		font-weight: 500;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 21px;
		padding: 14px 28px;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		letter-spacing: -0.01em;
		transition: transform 0.2s, box-shadow 0.3s;
		box-shadow: 0 0 0 0 rgba(99, 102, 241, 0), 0 4px 16px rgba(99, 102, 241, 0.2);
		position: relative;
		overflow: hidden;
	}

	.btn-primary::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: 9px;
		padding: 1px;
		background: linear-gradient(135deg, var(--accent), var(--gold));
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 32px rgba(99, 102, 241, 0.35), 0 0 20px rgba(201, 168, 76, 0.12);
	}

	.btn-primary:hover::before { opacity: 1; }
	.btn-primary--large { font-size: 24px; padding: 16px 36px; }

	@media (max-width: 640px) {
		.cta-title { font-size: clamp(28px, 7vw, 40px) !important; }
		.btn-primary--large { font-size: 18px; padding: 14px 24px; }
	}
</style>
