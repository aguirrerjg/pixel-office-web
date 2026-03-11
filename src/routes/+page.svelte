<script>
	import { onMount } from 'svelte';

	let scrollY = 0;
	let navEl;
	let mounted = false;

	onMount(() => {
		mounted = true;

		const handleScroll = () => {
			scrollY = window.scrollY;
			if (navEl) {
				if (scrollY > 60) {
					navEl.classList.add('nav--scrolled');
				} else {
					navEl.classList.remove('nav--scrolled');
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		// Intersection Observer for staggered animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);

		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			observer.observe(el);
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Pixel Office — Your AI Team, Live</title>
	<meta name="description" content="Watch your AI agents work in real time. Pixel Office visualizes multi-agent orchestration with live status, paper toss animations, and zero-latency updates." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Gold accent stripe -->
<div class="top-stripe" aria-hidden="true"></div>

<!-- Background layers -->
<div class="bg-layers" aria-hidden="true">
	<div class="bg-grid"></div>
	<div class="bg-radial bg-radial--1"></div>
	<div class="bg-radial bg-radial--2"></div>
	<div class="bg-radial bg-radial--3"></div>
	<div class="bg-watermark">PIXEL OFFICE</div>
</div>

<div class="landing">
	<!-- Noise texture overlay -->
	<div class="noise" aria-hidden="true"></div>

	<!-- Nav -->
	<nav class="nav" bind:this={navEl}>
		<span class="logo">
			<span class="logo-pixel">PX</span>
			<span class="logo-name">Pixel Office</span>
		</span>
		<a href="https://pixel-office-app.vercel.app/office" class="nav-cta">Open Dashboard →</a>
	</nav>

	<!-- Hero -->
	<section class="hero">
		<div class="hero-badge cascade cascade--1">Live · Real-time · Multi-agent</div>
		<h1 class="hero-title cascade cascade--2">
			Your AI team.<br />
			<em>Live.</em>
		</h1>
		<p class="hero-sub cascade cascade--3">
			Watch 9 autonomous agents across 2 platforms work, think, and delegate —
			all in a pixel-perfect office.
		</p>
		<div class="hero-actions cascade cascade--4">
			<a href="https://pixel-office-app.vercel.app/office" class="btn-primary">Enter the Office</a>
			<span class="hero-hint">No login required</span>
		</div>

		<!-- Floating status chips -->
		<div class="status-chips cascade cascade--5" aria-hidden="true">
			<span class="chip chip--active">chief_agent thinking...</span>
			<span class="chip chip--idle">pmo_agent idle</span>
			<span class="chip chip--active">architect_agent working...</span>
			<span class="chip chip--delegating">→ delegating task</span>
		</div>
	</section>

	<!-- Stats bar -->
	<div class="stats-bar animate-on-scroll">
		<div class="stat">
			<span class="stat-num">2</span>
			<span class="stat-label">Teams</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">9</span>
			<span class="stat-label">Agents</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">2s</span>
			<span class="stat-label">Poll interval</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">∞</span>
			<span class="stat-label">Parallel tasks</span>
		</div>
	</div>

	<!-- Feature cards -->
	<section class="features">
		<div class="feature-card animate-on-scroll" style="--card-delay: 0s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">◉</div>
			<h3>Live Status</h3>
			<p>Every agent's state updates in real time. Idle, thinking, working, delegating — always visible.</p>
		</div>
		<div class="feature-card feature-card--accent animate-on-scroll" style="--card-delay: 0.1s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">✈</div>
			<h3>Paper Toss</h3>
			<p>Delegation is visual. Watch animated paper arcs fly between agents when tasks are handed off.</p>
		</div>
		<div class="feature-card animate-on-scroll" style="--card-delay: 0.2s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">⬡</div>
			<h3>Multi-platform</h3>
			<p>Miles on Telegram, PMO on Slack — two teams, one unified office view. Platform icons included.</p>
		</div>
		<div class="feature-card animate-on-scroll" style="--card-delay: 0.3s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">⚡</div>
			<h3>Zero-latency UI</h3>
			<p>SvelteKit 5 with reactive stores. No heavy runtime, no virtual DOM diffing. Just fast.</p>
		</div>
	</section>

	<!-- Quote -->
	<section class="quote-section animate-on-scroll">
		<blockquote class="quote">
			<div class="quote-mark" aria-hidden="true">"</div>
			<p>"The office of the future isn't a place you go.<br />It's a system you observe."</p>
			<cite>— On autonomous work, 2026</cite>
		</blockquote>
	</section>

	<!-- Final CTA -->
	<section class="cta-section animate-on-scroll">
		<h2 class="cta-title">Ready to watch them work?</h2>
		<a href="https://pixel-office-app.vercel.app/office" class="btn-primary btn-primary--large">Open Pixel Office</a>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<span class="footer-logo">PX</span>
		<span class="footer-copy">Pixel Office · Built with SvelteKit 5 &amp; Claude SDK</span>
	</footer>
</div>

<style>
	/* ── Tokens ── */
	:global(body) {
		margin: 0;
		padding: 0;
		background: #07070f;
		color: #e2e0ff;
		font-family: 'Syne', sans-serif;
		overflow-x: hidden;
	}

	:root {
		--bg: #07070f;
		--bg2: #0d0b1a;
		--accent: #6366f1;
		--accent2: #a78bfa;
		--accent-dim: rgba(99, 102, 241, 0.15);
		--gold: #c9a84c;
		--gold-dim: rgba(201, 168, 76, 0.12);
		--gold-glow: rgba(201, 168, 76, 0.25);
		--gold-border: rgba(201, 168, 76, 0.3);
		--text: #e2e0ff;
		--text-muted: #7c7a9e;
		--border: rgba(99, 102, 241, 0.2);
		--mono: 'DM Mono', monospace;
		--display: 'Playfair Display', serif;
	}

	/* ── Top gold stripe ── */
	.top-stripe {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--gold) 20%, #e8d48b 50%, var(--gold) 80%, transparent);
		z-index: 100;
	}

	/* ── Background layers ── */
	.bg-layers {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.bg-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
		background-size: 64px 64px;
	}

	.bg-radial {
		position: absolute;
		border-radius: 50%;
	}

	.bg-radial--1 {
		top: -20%;
		right: -10%;
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
	}

	.bg-radial--2 {
		bottom: 10%;
		left: -15%;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 70%);
	}

	.bg-radial--3 {
		top: 40%;
		right: 20%;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(167, 139, 250, 0.04) 0%, transparent 70%);
	}

	.bg-watermark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-12deg);
		font-family: var(--display);
		font-size: clamp(100px, 15vw, 220px);
		font-weight: 900;
		color: rgba(99, 102, 241, 0.018);
		white-space: nowrap;
		letter-spacing: 0.05em;
		user-select: none;
	}

	/* ── Noise ── */
	.noise {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		opacity: 0.035;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 200px;
	}

	/* ── Landing wrapper ── */
	.landing {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 24px;
	}

	/* ── Nav (glassmorphism) ── */
	.nav {
		position: fixed;
		top: 3px;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px max(24px, calc((100vw - 1120px) / 2 + 24px));
		z-index: 50;
		transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
		background: transparent;
		border-bottom: 1px solid transparent;
		animation: fadeDown 0.6s ease both;
	}

	.nav--scrolled {
		background: rgba(7, 7, 15, 0.72);
		backdrop-filter: blur(20px) saturate(1.4);
		-webkit-backdrop-filter: blur(20px) saturate(1.4);
		border-bottom: 1px solid var(--border);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.logo-pixel {
		font-family: var(--mono);
		font-weight: 500;
		font-size: 13px;
		background: var(--accent);
		color: #fff;
		padding: 3px 7px;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}

	.logo-name {
		font-weight: 700;
		font-size: 16px;
		letter-spacing: -0.01em;
		color: var(--text);
	}

	.nav-cta {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--gold);
		text-decoration: none;
		border: 1px solid var(--gold-border);
		padding: 8px 16px;
		border-radius: 6px;
		transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
	}

	.nav-cta:hover {
		background: var(--gold-dim);
		border-color: var(--gold);
		box-shadow: 0 0 20px rgba(201, 168, 76, 0.15);
	}

	/* ── Hero ── */
	.hero {
		padding: 140px 0 64px;
		max-width: 720px;
	}

	/* ── Cascade entrance animations ── */
	.cascade {
		opacity: 0;
		transform: translateY(28px);
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.cascade--1 { animation-delay: 0.15s; }
	.cascade--2 { animation-delay: 0.35s; }
	.cascade--3 { animation-delay: 0.55s; }
	.cascade--4 { animation-delay: 0.72s; }
	.cascade--5 { animation-delay: 0.9s; }

	@keyframes cascadeIn {
		from {
			opacity: 0;
			transform: translateY(28px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--gold);
		border: 1px solid var(--gold-border);
		background: var(--gold-dim);
		padding: 5px 14px;
		border-radius: 20px;
		margin-bottom: 32px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.hero-badge::before {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 8px #22c55e;
		animation: pulse 2s ease-in-out infinite;
	}

	.hero-title {
		font-family: var(--display);
		font-size: clamp(52px, 8vw, 92px);
		font-weight: 800;
		line-height: 1.0;
		letter-spacing: -0.02em;
		color: var(--text);
		margin: 0 0 28px;
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
		font-size: 18px;
		line-height: 1.7;
		color: var(--text-muted);
		margin: 0 0 40px;
		font-weight: 400;
		max-width: 560px;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.hero-hint {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-muted);
	}

	/* ── Floating chips ── */
	.status-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 56px;
	}

	.chip {
		font-family: var(--mono);
		font-size: 11px;
		padding: 5px 12px;
		border-radius: 4px;
		border: 1px solid var(--border);
		letter-spacing: 0.02em;
	}

	.chip--active {
		color: #86efac;
		background: rgba(34, 197, 94, 0.08);
		border-color: rgba(34, 197, 94, 0.2);
		animation: chipFloat 3s ease-in-out infinite;
	}

	.chip--idle {
		color: var(--text-muted);
		background: rgba(255, 255, 255, 0.03);
		animation: chipFloat 3s ease-in-out 0.8s infinite;
	}

	.chip--delegating {
		color: var(--gold);
		background: var(--gold-dim);
		border-color: var(--gold-border);
		animation: chipFloat 3s ease-in-out 1.6s infinite;
	}

	/* ── Stats bar ── */
	.stats-bar {
		display: flex;
		align-items: center;
		gap: 40px;
		padding: 32px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		margin-bottom: 80px;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	.stats-bar.in-view {
		opacity: 1;
		transform: translateY(0);
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat-num {
		font-family: var(--display);
		font-size: 38px;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.stat-label {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: var(--border);
	}

	/* ── Feature cards ── */
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
		transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
		position: relative;
		overflow: hidden;
		/* scroll animation */
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s ease var(--card-delay, 0s), transform 0.6s ease var(--card-delay, 0s), border-color 0.3s, box-shadow 0.3s;
	}

	.feature-card.in-view {
		opacity: 1;
		transform: translateY(0);
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

	.feature-card:hover .feature-glow {
		opacity: 1;
	}

	.feature-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
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

	.feature-card:hover::before {
		opacity: 1;
	}

	.feature-card--accent {
		background: linear-gradient(135deg, #0d0b1a 0%, rgba(201, 168, 76, 0.06) 100%);
		border-color: var(--gold-border);
	}

	.feature-icon {
		font-size: 22px;
		margin-bottom: 16px;
		color: var(--gold);
		line-height: 1;
		position: relative;
		z-index: 1;
	}

	.feature-card h3 {
		font-size: 17px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 10px;
		letter-spacing: -0.01em;
		position: relative;
		z-index: 1;
	}

	.feature-card p {
		font-size: 14px;
		line-height: 1.65;
		color: var(--text-muted);
		margin: 0;
		position: relative;
		z-index: 1;
	}

	/* ── Quote ── */
	.quote-section {
		padding: 80px 0;
		display: flex;
		justify-content: center;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	.quote-section.in-view {
		opacity: 1;
		transform: translateY(0);
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
		font-size: 23px;
		font-weight: 700;
		font-style: italic;
		line-height: 1.55;
		color: var(--text);
		margin: 0 0 24px;
		letter-spacing: -0.005em;
	}

	.quote cite {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--gold);
		font-style: normal;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	/* ── CTA section ── */
	.cta-section {
		text-align: center;
		padding: 80px 0;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	.cta-section.in-view {
		opacity: 1;
		transform: translateY(0);
	}

	.cta-title {
		font-family: var(--display);
		font-size: clamp(28px, 4vw, 46px);
		font-weight: 800;
		color: var(--text);
		margin: 0 0 36px;
		letter-spacing: -0.02em;
	}

	/* ── Buttons ── */
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
		color: #fff;
		text-decoration: none;
		font-weight: 700;
		font-size: 15px;
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
	}

	.btn-primary:hover::before {
		opacity: 1;
	}

	.btn-primary--large {
		font-size: 17px;
		padding: 16px 36px;
	}

	/* ── Footer ── */
	.footer {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 32px 0;
		border-top: 1px solid var(--border);
		margin-top: 40px;
	}

	.footer-logo {
		font-family: var(--mono);
		font-size: 12px;
		background: var(--accent);
		color: #fff;
		padding: 3px 7px;
		border-radius: 4px;
	}

	.footer-copy {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-muted);
	}

	/* ── Animations ── */
	@keyframes fadeDown {
		from { opacity: 0; transform: translateY(-16px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.5; transform: scale(0.85); }
	}

	@keyframes chipFloat {
		0%, 100% { transform: translateY(0); }
		50%       { transform: translateY(-4px); }
	}

	/* ── Responsive ── */
	@media (max-width: 640px) {
		.hero { padding: 120px 0 40px; }
		.nav { padding: 16px 20px; }
		.stats-bar { gap: 24px; flex-wrap: wrap; }
		.stat-divider { display: none; }
		.hero-actions { flex-direction: column; align-items: flex-start; }
		.quote { padding: 40px 24px; }
		.quote p { font-size: 18px; }
		.quote-mark { font-size: 80px; }
	}
</style>
