<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="cta-section">
	<div class="cta-glow" aria-hidden="true"></div>
	<h2 class="cta-title">{i.ctaTitle}</h2>
	<p class="cta-sub">{i.ctaSub}</p>
	<div class="cta-actions">
		<a
			class="btn-primary btn-primary--large"
			href="https://thalx.io"
			target="_blank"
			rel="noopener noreferrer"
		>
			{i.ctaBtn}
		</a>
		<a
			class="btn-secondary"
			href="https://ai4managers.net"
			target="_blank"
			rel="noopener noreferrer"
		>
			{i.ctaBtnSecondary}
		</a>
	</div>
</section>

<style>
	.cta-section {
		text-align: center;
		padding: 80px 0 96px;
		opacity: 0;
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.1s forwards;
		position: relative;
	}

	.cta-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 300px;
		background: radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
		pointer-events: none;
	}

	.cta-title {
		font-family: var(--display);
		font-size: clamp(36px, 5vw, 56px);
		font-weight: 800;
		color: var(--text);
		margin: 0 0 24px;
		letter-spacing: -0.02em;
		position: relative;
	}

	.cta-sub {
		font-size: 20px;
		color: var(--text-muted);
		margin: 0 0 40px;
		line-height: 1.7;
		font-weight: 500;
		max-width: 520px;
		margin-left: auto;
		margin-right: auto;
		position: relative;
	}

	.cta-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		flex-wrap: wrap;
		position: relative;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 18px;
		padding: 14px 28px;
		border-radius: 8px;
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
		color: #fff;
	}

	.btn-primary:hover::before { opacity: 1; }
	.btn-primary--large { font-size: 20px; padding: 16px 36px; }

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		font-family: 'Syne', sans-serif;
		font-weight: 600;
		font-size: 18px;
		color: var(--text-muted);
		text-decoration: none;
		padding: 16px 28px;
		border-radius: 8px;
		border: 1px solid var(--border);
		transition: color 0.2s, border-color 0.2s, background 0.2s;
		letter-spacing: -0.01em;
	}

	.btn-secondary:hover {
		color: var(--text);
		border-color: var(--accent);
		background: rgba(99, 102, 241, 0.06);
	}

	@media (max-width: 640px) {
		.cta-title { font-size: clamp(28px, 7vw, 40px) !important; }
		.cta-sub { font-size: 17px; margin-bottom: 32px; }
		.cta-actions { flex-direction: column; align-items: stretch; }
		.btn-primary--large { font-size: 18px; padding: 14px 24px; text-align: center; justify-content: center; }
		.btn-secondary { font-size: 16px; padding: 14px 24px; text-align: center; justify-content: center; }
	}
</style>
