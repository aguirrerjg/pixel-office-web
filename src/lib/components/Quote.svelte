<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<section class="quote-section">
	<blockquote class="quote">
		<div class="quote-mark" aria-hidden="true">"</div>
		<p>{i.quote}</p>
		<cite>{i.quoteCite}</cite>
	</blockquote>
</section>

<style>
	.quote-section {
		padding: 80px 0;
		display: flex;
		justify-content: center;
		opacity: 0;
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards;
	}

	.quote {
		max-width: 660px;
		text-align: center;
		margin: 0;
		padding: 56px 52px;
		border: 1px solid var(--gold-border);
		border-radius: 16px;
		background: linear-gradient(145deg, var(--bg2) 0%, rgba(201, 168, 76, 0.04) 50%, rgba(99, 102, 241, 0.04) 100%);
		position: relative;
		overflow: hidden;
		box-shadow: 0 0 60px rgba(201, 168, 76, 0.06), inset 0 0 60px rgba(0, 0, 0, 0.3);
	}

	.quote-mark {
		font-family: var(--display);
		font-size: 120px;
		font-weight: 900;
		line-height: 0.7;
		background: linear-gradient(180deg, var(--gold) 0%, rgba(201, 168, 76, 0.15) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 8px;
	}

	.quote p {
		font-family: var(--display);
		font-size: 34px;
		font-weight: 700;
		font-style: italic;
		line-height: 1.55;
		color: var(--text);
		margin: 0 0 24px;
		letter-spacing: -0.005em;
	}

	.quote cite {
		font-family: var(--mono);
		font-size: 17px;
		color: var(--gold);
		font-style: normal;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	:global([data-theme="light"]) .quote {
		background: linear-gradient(145deg, #ffffff 0%, rgba(154, 125, 46, 0.03) 50%, rgba(99, 102, 241, 0.03) 100%);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 0 60px rgba(255, 255, 255, 0.5);
	}

	@media (max-width: 640px) {
		.quote { padding: 32px 20px; }
		.quote p { font-size: 22px; }
		.quote-mark { font-size: 80px; }
	}
</style>
