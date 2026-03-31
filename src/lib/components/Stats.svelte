<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';

	let { i }: { i: Translations } = $props();
</script>

<div class="stats-bar">
	<div class="stat">
		<span class="stat-num">{i.stat1}</span>
		<span class="stat-label">{i.stat1l}</span>
	</div>
	<div class="stat-divider"></div>
	<div class="stat">
		<span class="stat-num">{i.stat2}</span>
		<span class="stat-label">{i.stat2l}</span>
	</div>
	<div class="stat-divider"></div>
	<div class="stat">
		<span class="stat-num">{i.stat3}</span>
		<span class="stat-label">{i.stat3l}</span>
	</div>
	<div class="stat-divider"></div>
	<div class="stat">
		<span class="stat-num">{i.stat4}</span>
		<span class="stat-label">{i.stat4l}</span>
	</div>
</div>

<style>
	.stats-bar {
		display: flex;
		align-items: center;
		gap: 40px;
		padding: 32px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		margin-bottom: 80px;
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
		opacity: 0;
	}

	.stat { display: flex; flex-direction: column; gap: 4px; }

	.stat-num {
		font-family: var(--display);
		font-size: 56px;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.stat-label {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		max-width: 140px;
		line-height: 1.4;
	}

	.stat-divider { width: 1px; height: 40px; background: var(--border); flex-shrink: 0; }

	@media (max-width: 640px) {
		.stats-bar { gap: 20px; flex-wrap: wrap; justify-content: center; }
		.stat-num { font-size: 36px; }
		.stat-label { font-size: 11px; max-width: 100px; }
		.stat-divider { display: none; }
	}
</style>
