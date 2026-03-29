<script lang="ts">
	import type { Translations } from '$lib/i18n/translations.js';
	import { lang } from '$lib/i18n/store.js';

	let { i }: { i: Translations } = $props();

	let videoModalOpen = $state(false);

	// Cloudflare Stream video URLs per language (add EN when ready)
	const videoUrls: Record<string, string> = {
		es: 'https://customer-w9ibixuc04vgp9p1.cloudflarestream.com/9f272213ecd6d39be026c7e7215e3261/iframe?poster=https%3A%2F%2Fcustomer-w9ibixuc04vgp9p1.cloudflarestream.com%2F9f272213ecd6d39be026c7e7215e3261%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600'
	};

	let videoSrc = $derived(videoUrls[$lang] ?? '');

	function openVideoModal() {
		videoModalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeVideoModal() {
		videoModalOpen = false;
		document.body.style.overflow = '';
	}
</script>

<div class="showcase cascade cascade--4">
	<div class="showcase-glow" aria-hidden="true"></div>
	<div class="showcase-window">
		<div class="showcase-chrome">
			<div class="showcase-dots">
				<span></span><span></span><span></span>
			</div>
			<span class="showcase-title">{i.showcaseTitle}</span>
			<div class="showcase-live">
				<span class="showcase-live-dot"></span>
				LIVE
			</div>
		</div>
		<button class="showcase-media showcase-split" onclick={openVideoModal}>
			<div class="split-before">
				<span class="split-tag split-tag--red">{i.splitTagBefore}</span>
				<p class="split-title">{i.splitTitleBefore[0]}<br>{i.splitTitleBefore[1]}<br><span class="split-highlight--red">{i.splitTitleBefore[2]}</span></p>
				<p class="split-subtitle">{i.splitSubBefore}</p>
				<div class="split-icon-box split-icon-box--red">
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
						<circle cx="18" cy="13" r="5.5" stroke="#ff6b6b" stroke-width="1.5" opacity="0.6"/>
						<path d="M9 29c0-5 4-9 9-9s9 4 9 9" stroke="#ff6b6b" stroke-width="1.5" opacity="0.6"/>
						<path d="M12 18l12 12M24 18L12 30" stroke="#ff6b6b" stroke-width="1" opacity="0.3"/>
					</svg>
				</div>
			</div>
			<div class="split-divider" aria-hidden="true"></div>
			<div class="split-arrow" aria-hidden="true">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
					<path d="M4 9h10M10 5l4 4-4 4" stroke="#0d0b1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="split-after">
				<span class="split-tag split-tag--green">{i.splitTagAfter}</span>
				<p class="split-title">{i.splitTitleAfter[0]}<br>{i.splitTitleAfter[1]}<br><span class="split-highlight--green">{i.splitTitleAfter[2]}</span></p>
				<p class="split-subtitle">{i.splitSubAfter}</p>
				<div class="split-icon-box split-icon-box--green">
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
						<rect x="5" y="7" width="26" height="18" rx="3" stroke="#22c55e" stroke-width="1.5" opacity="0.6"/>
						<path d="M12 16h6M12 20h10" stroke="#22c55e" stroke-width="1" opacity="0.4"/>
						<circle cx="28" cy="27" r="5" fill="#22c55e" opacity="0.25"/>
						<path d="M26 27l1.5 1.5 3-3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</div>
			</div>
			<div class="play-ring">
				<div class="play-ring-pulse" aria-hidden="true"></div>
				<div class="play-ring-inner">
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
						<path d="M10 6.5l14 7.5-14 7.5V6.5z" fill="#fff"/>
					</svg>
				</div>
			</div>
			<span class="showcase-play-label">{i.playLabel}</span>
		</button>
	</div>
</div>

{#if videoModalOpen}
<div class="video-modal" role="dialog" aria-modal="true">
	<button class="video-modal-close" onclick={closeVideoModal} aria-label="Cerrar">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		</svg>
		<span>ESC</span>
	</button>
	<div class="video-modal-content">
		{#if videoSrc}
			<iframe src={videoSrc} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowfullscreen style="border:none;position:absolute;top:0;left:0;height:100%;width:100%;border-radius:12px;" title="Agent Squad — Video"></iframe>
		{:else}
			<div class="video-placeholder">
				<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
					<circle cx="32" cy="32" r="30" stroke="var(--gold)" stroke-width="2" opacity="0.3"/>
					<path d="M24 18l20 14-20 14V18z" fill="var(--gold)" opacity="0.5"/>
				</svg>
				<p>{i.videoSoon}</p>
			</div>
		{/if}
	</div>
</div>
{/if}

<style>
	.showcase {
		position: relative;
		width: 100%;
		max-width: 960px;
		margin: 0 auto;
	}

	.showcase-glow {
		position: absolute;
		inset: -40px;
		border-radius: 32px;
		background: radial-gradient(ellipse at center, var(--gold-glow) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%);
		filter: blur(60px);
		z-index: 0;
		animation: showcaseGlow 4s ease-in-out infinite;
	}

	.showcase-window {
		position: relative;
		z-index: 1;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(99, 102, 241, 0.25);
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(201, 168, 76, 0.06), 0 0 0 1px rgba(99, 102, 241, 0.1);
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
	}

	.showcase-window:hover {
		transform: translateY(-6px);
		box-shadow: 0 32px 100px rgba(0, 0, 0, 0.7), 0 0 60px rgba(201, 168, 76, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.2);
	}

	.showcase-chrome {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 18px;
		background: rgba(13, 11, 26, 0.95);
		border-bottom: 1px solid rgba(99, 102, 241, 0.12);
	}

	.showcase-dots { display: flex; gap: 6px; }
	.showcase-dots span { width: 10px; height: 10px; border-radius: 50%; }
	.showcase-dots span:nth-child(1) { background: #ff5f57; }
	.showcase-dots span:nth-child(2) { background: #ffbd2e; }
	.showcase-dots span:nth-child(3) { background: #28c840; }

	.showcase-title {
		flex: 1;
		text-align: center;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-muted);
		letter-spacing: 0.04em;
	}

	.showcase-live {
		display: flex;
		align-items: center;
		gap: 6px;
		font-family: var(--mono);
		font-size: 10px;
		color: #22c55e;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.showcase-live-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 8px #22c55e;
		animation: pulse 2s ease-in-out infinite;
	}

	.showcase-media {
		position: relative;
		display: block;
		width: 100%;
		border: none;
		padding: 0;
		cursor: pointer;
		background: none;
	}

	.showcase-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 420px;
		position: relative;
	}

	.split-before {
		background: linear-gradient(145deg, #1a1018 0%, #0d0b1a 100%);
		padding: 48px 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
	}

	.split-after {
		background: linear-gradient(145deg, #0d0b1a 0%, #0f1a14 100%);
		padding: 48px 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
	}

	.split-tag {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 5px 14px;
		border-radius: 20px;
	}

	.split-tag--red { color: #ff6b6b; border: 1px solid rgba(255, 107, 107, 0.3); background: rgba(255, 107, 107, 0.08); }
	.split-tag--green { color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3); background: rgba(34, 197, 94, 0.08); }

	.split-title {
		font-family: var(--display);
		font-size: 32px;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.8);
		text-align: center;
		line-height: 1.2;
	}

	.split-highlight--red { color: #ff6b6b; }
	.split-highlight--green { color: #22c55e; }

	.split-subtitle { font-size: 15px; color: var(--text-muted); text-align: center; }

	.split-icon-box {
		width: 140px;
		height: 80px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 8px;
	}

	.split-icon-box--red { background: rgba(255, 107, 107, 0.06); border: 1px solid rgba(255, 107, 107, 0.15); }
	.split-icon-box--green { background: rgba(34, 197, 94, 0.06); border: 1px solid rgba(34, 197, 94, 0.15); }

	.split-divider {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 2px;
		background: linear-gradient(to bottom, transparent, var(--gold), transparent);
		z-index: 5;
		pointer-events: none;
	}

	.split-arrow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--gold);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 6;
		box-shadow: 0 0 24px rgba(201, 168, 76, 0.4);
		pointer-events: none;
	}

	.showcase-split .play-ring {
		position: absolute;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.showcase-split .showcase-play-label {
		position: absolute;
		bottom: -2px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.play-ring {
		position: relative;
		width: 88px;
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.play-ring-pulse {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 2px solid var(--gold);
		opacity: 0;
		animation: playPulse 2.5s ease-out infinite;
	}

	.play-ring-inner {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: rgba(201, 168, 76, 0.15);
		backdrop-filter: blur(12px);
		border: 2px solid var(--gold);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
		box-shadow: 0 0 30px rgba(201, 168, 76, 0.2);
	}

	.showcase-media:hover .play-ring-inner {
		background: rgba(201, 168, 76, 0.3);
		transform: scale(1.08);
		box-shadow: 0 0 50px rgba(201, 168, 76, 0.35);
	}

	.play-ring-inner svg { margin-left: 4px; }

	.showcase-play-label {
		font-family: var(--mono);
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition: color 0.3s;
	}

	.showcase-media:hover .showcase-play-label { color: var(--gold); }

	.video-modal {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(7, 7, 15, 0.95);
		backdrop-filter: blur(24px);
		animation: fadeIn 0.3s ease;
	}

	.video-modal-close {
		position: absolute;
		top: 24px;
		right: 32px;
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 13px;
		transition: color 0.2s;
	}

	.video-modal-close:hover { color: #fff; }

	.video-modal-content {
		position: relative;
		width: 100%;
		max-width: 960px;
		padding-top: 56.25%;
		margin: 0 32px;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(201, 168, 76, 0.2);
		box-shadow: 0 32px 100px rgba(0, 0, 0, 0.8);
	}

	.video-placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		background: var(--bg2);
	}

	.video-placeholder p {
		font-family: var(--mono);
		font-size: 16px;
		color: var(--text-muted);
		letter-spacing: 0.06em;
	}

	@media (max-width: 1024px) {
		.play-ring-inner { width: 60px; height: 60px; }
		.play-ring { width: 72px; height: 72px; }
	}

	@media (max-width: 640px) {
		.showcase-chrome { padding: 8px 12px; }
		.showcase-title { font-size: 10px; }
		.play-ring-inner { width: 52px; height: 52px; }
		.play-ring { width: 64px; height: 64px; }
		.play-ring-inner svg { width: 20px; height: 20px; }
		.showcase-play-label { font-size: 11px; }
		.showcase-split { min-height: 320px; }
		.split-before, .split-after { padding: 32px 20px; }
		.split-title { font-size: 22px; }
		.split-subtitle { font-size: 13px; }
		.split-icon-box { width: 100px; height: 60px; }
		.split-icon-box svg { width: 28px; height: 28px; }
		.split-arrow { width: 36px; height: 36px; }
		.split-arrow svg { width: 14px; height: 14px; }
		.video-modal-content { margin: 0 16px; }
	}
</style>
