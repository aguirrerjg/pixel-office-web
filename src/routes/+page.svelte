<script>
	import { onMount } from 'svelte';

	let scrollY = 0;
	let navEl;
	let mounted = false;

	let formStatus = 'idle'; // idle | sending | sent
	let theme = 'dark'; // dark | light
	let videoModalOpen = false;
	// Placeholder — replace with Cloudflare Stream URL when ready
	let videoSrc = '';

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
	}

	function openVideoModal() {
		videoModalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeVideoModal() {
		videoModalOpen = false;
		document.body.style.overflow = '';
	}

	async function handleFormSubmit(e) {
		formStatus = 'sending';
		const data = new FormData(e.target);
		const payload = Object.fromEntries(data.entries());
		try {
			await fetch('https://formspree.io/f/xwpkgjpq', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.error('Form error:', err);
		}
		formStatus = 'sent';
	}

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

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Agent Squad — AI Teams as a Service | Watch Your AI Agents Work Live</title>
	<meta name="description" content="Agent Squad: equipos de agentes IA autónomos que puedes verificar en tiempo real. Dashboard en vivo para ver delegación, errores y progreso — sin reportes manuales. AI Teams as a Service." />
	<link rel="canonical" href="https://pixel-office-web.vercel.app/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Agent Squad — AI Teams as a Service" />
	<meta property="og:description" content="Equipos de agentes IA autónomos que puedes verificar en tiempo real. Ve quién delega a quién, detecta bloqueos y confirma progreso — sin esperar reportes. Gratis, sin configuración." />
	<meta property="og:url" content="https://pixel-office-web.vercel.app/" />
	<meta property="og:image" content="https://pixel-office-web.vercel.app/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Agent Squad" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Agent Squad — AI Teams as a Service" />
	<meta name="twitter:image" content="https://pixel-office-web.vercel.app/og-image.png" />
	<meta name="twitter:description" content="Equipos de agentes IA autónomos que puedes verificar en tiempo real. Dashboard en vivo para ver delegación, errores y progreso. Gratis, sin configuración." />

	<!-- Additional meta -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Agent Squad" />
	<meta name="keywords" content="AI Teams as a Service, AI agents, multi-agent orchestration, real-time AI dashboard, autonomous AI, Agent Squad, agentes IA, equipos de IA" />

	<!-- Crisp Chat -->
	{@html `<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="625e06e9-b922-461d-bc68-da2a84077632";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`}

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

	<!-- Organization Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Agent Squad",
		"url": "https://pixel-office-web.vercel.app",
		"description": "AI Teams as a Service — equipos de agentes IA autónomos que trabajan 24/7 con monitoreo en tiempo real",
		"sameAs": []
	})}</script>`}

	<!-- SoftwareApplication Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "Agent Squad",
		"url": "https://pixel-office-web.vercel.app",
		"applicationCategory": "BusinessApplication",
		"operatingSystem": "Web",
		"description": "Agent Squad: equipos de agentes IA autónomos con dashboard en tiempo real. Verifica delegación, errores y progreso sin reportes manuales. AI Teams as a Service.",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD",
			"description": "Free live dashboard access"
		},
		"featureList": [
			"Real-time AI agent monitoring",
			"Multi-platform unified dashboard",
			"Visual task delegation tracking",
			"Scalable autonomous agent teams",
			"Instant status updates",
			"Zero-configuration setup"
		]
	})}</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "¿Qué recibo en el diseño gratuito del squad?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Una propuesta personalizada con: roles de agentes IA para tu operación, tareas específicas que automatizan, estimación de horas recuperadas por semana, y cómo se integra con tu stack actual. No es un template genérico — es específico para tu negocio."
				}
			},
			{
				"@type": "Question",
				"name": "¿Necesito conocimientos técnicos para usar Agent Squad?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Cero. Tú describes qué necesitas en lenguaje natural, nosotros diseñamos y desplegamos el squad. Lo único que haces es dar instrucciones como a cualquier empleado. Sin código, sin configuración técnica."
				}
			},
			{
				"@type": "Question",
				"name": "¿Cuánto cuesta un squad de agentes IA?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "El diseño del squad es 100% gratuito. El costo de implementación depende del número de agentes y complejidad de las integraciones — lo detallamos en la propuesta. Es una fracción del costo de contratar personas para los mismos roles."
				}
			},
			{
				"@type": "Question",
				"name": "¿Qué pasa si no funciona para mi caso?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Por eso el diseño es gratis. Si tu operación no se beneficia de un squad de agentes IA, te lo decimos directamente. Sin presión, sin compromiso, sin letra pequeña."
				}
			},
			{
				"@type": "Question",
				"name": "¿Cuánto tarda en estar operativo un squad?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Desde 1 semana para squads simples de 2-3 agentes hasta 3 semanas para squads complejos con múltiples integraciones. Resultados visibles desde el día 1 de despliegue — sin período de prueba ni ramp-up."
				}
			}
		]
	})}</script>`}
</svelte:head>

<!-- Gold accent stripe -->
<div class="top-stripe" aria-hidden="true"></div>

<!-- Background layers -->
<div class="bg-layers" aria-hidden="true">
	<div class="bg-grid"></div>
	<div class="bg-radial bg-radial--1"></div>
	<div class="bg-radial bg-radial--2"></div>
	<div class="bg-radial bg-radial--3"></div>
	<div class="bg-watermark">AGENT SQUAD</div>
</div>

<div class="landing">
	<!-- Noise texture overlay -->
	<div class="noise" aria-hidden="true"></div>

	<!-- Nav -->
	<nav class="nav" bind:this={navEl}>
		<span class="logo">
			<span class="logo-pixel">AS</span>
			<span class="logo-name">Agent Squad</span>
		</span>
		<div class="nav-right">
			<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
				{#if theme === 'dark'}
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.17 3.17l1.06 1.06M11.77 11.77l1.06 1.06M3.17 12.83l1.06-1.06M11.77 4.23l1.06-1.06" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
				{:else}
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 9.5A6.5 6.5 0 016.5 2 5.5 5.5 0 1014 9.5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
				{/if}
			</button>
		</div>
	</nav>

	<!-- Hero — centered (Crisp-style) -->
	<section class="hero">
		<div class="hero-centered">
			<h1 class="hero-title cascade cascade--1">
				Contratar es lento. Entrenar es caro. <em>Tu Squad IA empieza hoy.</em>
			</h1>
			<p class="hero-sub cascade cascade--2">
				Cuéntanos tu operación y en 24 horas diseñamos el equipo de agentes IA que necesitas: qué roles, qué tareas automatizan, y cuántas horas recuperas. Sin costo. Sin compromiso.
			</p>
			<div class="hero-actions cascade cascade--3">
				<button class="btn-hero-cta" onclick={() => window.$crisp?.push(['do', 'chat:open'])}>
					<span class="btn-hero-pulse" aria-hidden="true"></span>
					<span class="btn-hero-text">Quiero mi Squad → Hablemos</span>
					<svg class="btn-hero-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Video Showcase — Split Before/After -->
		<div class="showcase cascade cascade--4">
			<div class="showcase-glow" aria-hidden="true"></div>
			<div class="showcase-window">
				<!-- Window chrome -->
				<div class="showcase-chrome">
					<div class="showcase-dots">
						<span></span><span></span><span></span>
					</div>
					<span class="showcase-title">Agent Squad — Caso de Uso</span>
					<div class="showcase-live">
						<span class="showcase-live-dot"></span>
						LIVE
					</div>
				</div>
				<!-- Split panels + play -->
				<button class="showcase-media showcase-split" onclick={openVideoModal}>
					<!-- BEFORE panel -->
					<div class="split-before">
						<span class="split-tag split-tag--red">Cuello de botella</span>
						<p class="split-title">Un<br>Gerente con<br><span class="split-highlight--red">30 empleados</span></p>
						<p class="split-subtitle">Todo pasa por el gerente</p>
						<div class="split-icon-box split-icon-box--red">
							<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
								<circle cx="18" cy="13" r="5.5" stroke="#ff6b6b" stroke-width="1.5" opacity="0.6"/>
								<path d="M9 29c0-5 4-9 9-9s9 4 9 9" stroke="#ff6b6b" stroke-width="1.5" opacity="0.6"/>
								<path d="M12 18l12 12M24 18L12 30" stroke="#ff6b6b" stroke-width="1" opacity="0.3"/>
							</svg>
						</div>
					</div>

					<!-- Divider + arrow -->
					<div class="split-divider" aria-hidden="true"></div>
					<div class="split-arrow" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path d="M4 9h10M10 5l4 4-4 4" stroke="#0d0b1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>

					<!-- AFTER panel -->
					<div class="split-after">
						<span class="split-tag split-tag--green">Alta rentabilidad</span>
						<p class="split-title">Un<br>Gerente con<br><span class="split-highlight--green">1 Squad AI</span></p>
						<p class="split-subtitle">El gerente ya no coordina</p>
						<div class="split-icon-box split-icon-box--green">
							<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
								<rect x="5" y="7" width="26" height="18" rx="3" stroke="#22c55e" stroke-width="1.5" opacity="0.6"/>
								<path d="M12 16h6M12 20h10" stroke="#22c55e" stroke-width="1" opacity="0.4"/>
								<circle cx="28" cy="27" r="5" fill="#22c55e" opacity="0.25"/>
								<path d="M26 27l1.5 1.5 3-3" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</div>
					</div>

					<!-- Play button centered -->
					<div class="play-ring">
						<div class="play-ring-pulse" aria-hidden="true"></div>
						<div class="play-ring-inner">
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
								<path d="M10 6.5l14 7.5-14 7.5V6.5z" fill="#fff"/>
							</svg>
						</div>
					</div>
					<span class="showcase-play-label">Ver caso de uso</span>
				</button>
			</div>
		</div>
	</section>

	<!-- Video Modal -->
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
				<iframe src={videoSrc} allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;border:none;border-radius:12px;"></iframe>
			{:else}
				<div class="video-placeholder">
					<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
						<circle cx="32" cy="32" r="30" stroke="var(--gold)" stroke-width="2" opacity="0.3"/>
						<path d="M24 18l20 14-20 14V18z" fill="var(--gold)" opacity="0.5"/>
					</svg>
					<p>Video próximamente</p>
				</div>
			{/if}
		</div>
	</div>
	{/if}

	<!-- Stats bar -->
	<div class="stats-bar">
		<div class="stat">
			<span class="stat-num">24h</span>
			<span class="stat-label">Tu squad diseñado</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">24/7</span>
			<span class="stat-label">Tu equipo nunca duerme</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">0</span>
			<span class="stat-label">Rotación de personal</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">∞</span>
			<span class="stat-label">Escalable sin contratar</span>
		</div>
	</div>

	<!-- Feature cards -->
	<section class="features">
		<div class="feature-card" style="--card-delay: 0s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">◉</div>
			<h3>Un equipo que no renuncia</h3>
			<p>Agentes IA especializados por rol: investigación, desarrollo, contenido, operaciones. Trabajan 24/7, no piden vacaciones, y nunca se van a la competencia.</p>
		</div>
		<div class="feature-card feature-card--accent" style="--card-delay: 0.1s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">✈</div>
			<h3>Delegación que puedes ver</h3>
			<p>Observa en tiempo real cómo tu squad se coordina. Quién delegó a quién, qué están procesando, y dónde está cada tarea. Visibilidad total sin perseguir updates.</p>
		</div>
		<div class="feature-card" style="--card-delay: 0.2s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">⬡</div>
			<h3>Escala sin entrevistas</h3>
			<p>¿Necesitas más capacidad? Agrega agentes en minutos, no en meses. Sin job postings, sin onboarding de 90 días, sin curva de aprendizaje.</p>
		</div>
		<div class="feature-card" style="--card-delay: 0.3s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">⚡</div>
			<h3>Resultados desde la semana 1</h3>
			<p>Tu squad empieza a ejecutar inmediatamente. Sin período de prueba, sin ramp-up. La diferencia entre contratar en 3 meses y tener resultados mañana.</p>
		</div>
	</section>

	<!-- Quote -->
	<section class="quote-section">
		<blockquote class="quote">
			<div class="quote-mark" aria-hidden="true">"</div>
			<p>"Necesitábamos un equipo de contenido, research y soporte. Contratar 3 personas nos tomaba 4 meses y $15K/mes. Con Agent Squad tuvimos el equipo funcionando en una semana. Llevan 6 meses sin faltar un solo día."</p>
			<cite>— Director de Operaciones, 2026</cite>
		</blockquote>
	</section>

	<!-- Final CTA -->
	<section class="cta-section">
		<h2 class="cta-title">Tu próximo equipo no necesita oficina.</h2>
		<p style="font-size: 24px; color: var(--text-muted); margin: 0 0 32px; line-height: 1.7; font-weight: 500;">Cuéntanos tu operación por chat. Te diseñamos tu squad IA personalizado: roles, tareas, impacto estimado. Gratis.</p>
		<button class="btn-primary btn-primary--large" onclick={() => window.$crisp?.push(['do', 'chat:open'])}>Hablar con el equipo</button>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<span class="footer-logo">AI</span>
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
		--text-muted: #9492b8;
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
		max-width: 1200px;
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
		font-size: 18px;
		background: var(--accent);
		color: #fff;
		padding: 3px 7px;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}

	.logo-name {
		font-weight: 700;
		font-size: 24px;
		letter-spacing: -0.01em;
		color: var(--text);
	}

	.nav-cta {
		font-family: var(--mono);
		font-size: 18px;
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

	.nav-right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--gold);
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s;
	}

	.theme-toggle:hover {
		background: var(--gold-dim);
		border-color: var(--gold-border);
	}

	/* ── Light Theme ── */
	:global([data-theme="light"]) {
		--bg: #f8f7f4;
		--bg2: #ffffff;
		--accent: #6366f1;
		--accent2: #7c3aed;
		--accent-dim: rgba(99, 102, 241, 0.1);
		--gold: #7a6220;
		--gold-dim: rgba(122, 98, 32, 0.1);
		--gold-glow: rgba(122, 98, 32, 0.18);
		--gold-border: rgba(122, 98, 32, 0.3);
		--text: #1a1a2e;
		--text-muted: #55556e;
		--border: rgba(99, 102, 241, 0.15);
	}

	:global([data-theme="light"]) :global(body) {
		background: #f8f7f4;
		color: #1a1a2e;
	}

	:global([data-theme="light"]) .top-stripe {
		background: linear-gradient(90deg, transparent, #7a6220 20%, #a8892e 50%, #7a6220 80%, transparent);
	}

	:global([data-theme="light"]) .bg-grid {
		background-image:
			linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px);
	}

	:global([data-theme="light"]) .bg-watermark {
		color: rgba(99, 102, 241, 0.04);
	}

	:global([data-theme="light"]) .bg-radial--1 {
		background: radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
	}

	:global([data-theme="light"]) .bg-radial--2 {
		background: radial-gradient(circle, rgba(154, 125, 46, 0.05) 0%, transparent 70%);
	}

	:global([data-theme="light"]) .noise {
		opacity: 0.015;
	}

	:global([data-theme="light"]) .nav--scrolled {
		background: rgba(248, 247, 244, 0.85);
		border-bottom: 1px solid rgba(99, 102, 241, 0.1);
	}

	:global([data-theme="light"]) .feature-card {
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
	}

	:global([data-theme="light"]) .feature-card--accent {
		background: linear-gradient(135deg, #ffffff 0%, rgba(154, 125, 46, 0.04) 100%);
	}

	:global([data-theme="light"]) .quote {
		background: linear-gradient(145deg, #ffffff 0%, rgba(154, 125, 46, 0.03) 50%, rgba(99, 102, 241, 0.03) 100%);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 0 60px rgba(255, 255, 255, 0.5);
	}

	:global([data-theme="light"]) .squad-form {
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
	}

	:global([data-theme="light"]) .form-input {
		background: rgba(0, 0, 0, 0.02);
		border-color: rgba(99, 102, 241, 0.15);
		color: #1a1a2e;
	}

	:global([data-theme="light"]) .form-input::placeholder {
		color: rgba(26, 26, 46, 0.5);
	}

	:global([data-theme="light"]) .squad-success {
		background: #ffffff;
	}

	:global([data-theme="light"]) .hero-image-link {
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12), 0 0 20px rgba(154, 125, 46, 0.06);
	}

	/* ── Hero (centered, Crisp-style) ── */
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

	.hero-centered .hero-title {
		text-align: center;
	}

	.hero-centered .hero-sub {
		text-align: center;
		max-width: 640px;
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
		font-size: 17px;
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
		font-size: clamp(48px, 6vw, 72px);
		font-weight: 800;
		line-height: 1.15;
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
		font-size: 26px;
		line-height: 1.8;
		color: var(--text-muted);
		margin: 0 0 40px;
		font-weight: 500;
		max-width: 560px;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.hero-hint {
		font-family: var(--mono);
		font-size: 17px;
		color: var(--text-muted);
	}

	/* ── Showcase (Crisp-style product window) ── */
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

	@keyframes showcaseGlow {
		0%, 100% { opacity: 0.4; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.03); }
	}

	.showcase-window {
		position: relative;
		z-index: 1;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(99, 102, 241, 0.25);
		box-shadow:
			0 24px 80px rgba(0, 0, 0, 0.6),
			0 0 40px rgba(201, 168, 76, 0.06),
			0 0 0 1px rgba(99, 102, 241, 0.1);
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
	}

	.showcase-window:hover {
		transform: translateY(-6px);
		box-shadow:
			0 32px 100px rgba(0, 0, 0, 0.7),
			0 0 60px rgba(201, 168, 76, 0.1),
			0 0 0 1px rgba(99, 102, 241, 0.2);
	}

	.showcase-chrome {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 18px;
		background: rgba(13, 11, 26, 0.95);
		border-bottom: 1px solid rgba(99, 102, 241, 0.12);
	}

	.showcase-dots {
		display: flex;
		gap: 6px;
	}

	.showcase-dots span {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

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

	.showcase-img {
		display: block;
		width: 100%;
		height: auto;
	}

	.showcase-overlay {
		position: absolute;
		inset: 0;
		background: rgba(7, 7, 15, 0.45);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		transition: background 0.4s ease;
	}

	.showcase-media:hover .showcase-overlay {
		background: rgba(7, 7, 15, 0.6);
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

	@keyframes playPulse {
		0% { opacity: 0.6; transform: scale(1); }
		100% { opacity: 0; transform: scale(1.6); }
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

	.play-ring-inner svg {
		margin-left: 4px;
	}

	.showcase-play-label {
		font-family: var(--mono);
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition: color 0.3s;
	}

	.showcase-media:hover .showcase-play-label {
		color: var(--gold);
	}

	/* ── Split Showcase (Before/After) ── */
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

	.split-tag--red {
		color: #ff6b6b;
		border: 1px solid rgba(255, 107, 107, 0.3);
		background: rgba(255, 107, 107, 0.08);
	}

	.split-tag--green {
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.3);
		background: rgba(34, 197, 94, 0.08);
	}

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

	.split-subtitle {
		font-size: 15px;
		color: var(--text-muted);
		text-align: center;
	}

	.split-icon-box {
		width: 140px;
		height: 80px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 8px;
	}

	.split-icon-box--red {
		background: rgba(255, 107, 107, 0.06);
		border: 1px solid rgba(255, 107, 107, 0.15);
	}

	.split-icon-box--green {
		background: rgba(34, 197, 94, 0.06);
		border: 1px solid rgba(34, 197, 94, 0.15);
	}

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

	/* ── Video Modal ── */
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

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
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

	.video-modal-close:hover {
		color: #fff;
	}

	.video-modal-content {
		width: 100%;
		max-width: 960px;
		aspect-ratio: 16/9;
		margin: 0 32px;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(201, 168, 76, 0.2);
		box-shadow: 0 32px 100px rgba(0, 0, 0, 0.8);
	}

	.video-placeholder {
		width: 100%;
		height: 100%;
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

	/* ── Stats bar ── */
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

	.stat {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

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
		font-size: 16px;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
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

	/* ── Quote ── */
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

	/* ── CTA section ── */
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

	/* ── Hero CTA (high presence) ── */
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
		box-shadow:
			0 0 0 0 rgba(99, 102, 241, 0),
			0 8px 32px rgba(99, 102, 241, 0.3),
			0 0 60px rgba(201, 168, 76, 0.1);
		overflow: hidden;
	}

	.btn-hero-cta:hover {
		transform: translateY(-3px) scale(1.03);
		box-shadow:
			0 0 0 4px rgba(99, 102, 241, 0.15),
			0 12px 48px rgba(99, 102, 241, 0.4),
			0 0 80px rgba(201, 168, 76, 0.15);
	}

	.btn-hero-cta:active {
		transform: translateY(0) scale(0.98);
	}

	@keyframes gradientShift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
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

	@keyframes heroPulse {
		0%, 100% { opacity: 0; transform: scale(1); }
		50% { opacity: 0.25; transform: scale(1.06); }
	}

	.btn-hero-text {
		position: relative;
		z-index: 1;
	}

	.btn-hero-arrow {
		position: relative;
		z-index: 1;
		transition: transform 0.3s ease;
	}

	.btn-hero-cta:hover .btn-hero-arrow {
		transform: translateX(4px);
	}

	.hero-trust {
		font-family: var(--mono);
		font-size: 14px;
		color: var(--text-muted);
		letter-spacing: 0.04em;
		margin-top: 12px;
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
		font-size: 21px;
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
		font-size: 24px;
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
		font-size: 17px;
		background: var(--accent);
		color: #fff;
		padding: 3px 7px;
		border-radius: 4px;
	}

	.footer-copy {
		font-family: var(--mono);
		font-size: 17px;
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

	/* ── Squad Form ── */
	.squad-form-section {
		padding: 80px 0;
		max-width: 640px;
		margin: 0 auto;
	}

	.squad-form-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.squad-form-badge {
		display: inline-block;
		font-family: var(--mono);
		font-size: 16px;
		color: var(--gold);
		border: 1px solid var(--gold-border);
		background: var(--gold-dim);
		padding: 4px 14px;
		border-radius: 20px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 20px;
	}

	.squad-form-title {
		font-family: var(--display);
		font-size: clamp(40px, 6vw, 60px);
		font-weight: 800;
		color: var(--text);
		margin: 0 0 12px;
		letter-spacing: -0.02em;
	}

	.squad-form-sub {
		font-size: 24px;
		color: var(--text-muted);
		line-height: 1.75;
		font-weight: 500;
		max-width: 480px;
		margin: 0 auto;
	}

	.squad-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 40px;
		border-radius: 16px;
		background: var(--bg2);
		border: 1px solid var(--border);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-label {
		font-family: var(--mono);
		font-size: 15px;
		color: var(--gold);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.85;
	}

	.form-input {
		width: 100%;
		padding: 14px 16px;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text);
		font-family: 'Syne', sans-serif;
		font-size: 20px;
		outline: none;
		transition: border-color 0.2s, background 0.2s;
	}

	.form-input::placeholder {
		color: rgba(226, 224, 255, 0.4);
	}

	.form-input:focus {
		border-color: var(--gold-border);
		background: rgba(201, 168, 76, 0.04);
	}

	.form-select {
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23c9a84c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
		padding-right: 36px;
	}

	.form-select option {
		background: #07070f;
		color: var(--text);
	}

	.squad-submit {
		width: 100%;
		justify-content: center;
		margin-top: 8px;
	}

	.form-trust {
		font-family: var(--mono);
		font-size: 16px;
		color: rgba(226, 224, 255, 0.2);
		text-align: center;
		letter-spacing: 0.06em;
		margin: 0;
	}

	.squad-success {
		text-align: center;
		padding: 48px 32px;
		border-radius: 16px;
		background: var(--bg2);
		border: 1px solid var(--gold-border);
		margin-top: 24px;
	}

	.squad-success-icon {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--gold-dim);
		color: var(--gold);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		margin: 0 auto 16px;
		border: 1px solid var(--gold-border);
	}

	.squad-success h3 {
		font-family: var(--display);
		font-size: 36px;
		font-weight: 800;
		color: var(--text);
		margin: 0 0 8px;
	}

	.squad-success p {
		font-size: 23px;
		color: var(--text-muted);
		margin: 0;
		font-weight: 500;
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.features { grid-template-columns: repeat(2, 1fr); }
		.play-ring-inner { width: 60px; height: 60px; }
		.play-ring { width: 72px; height: 72px; }
	}

	@media (max-width: 640px) {
		.hero { padding: 100px 0 40px; }
		.hero-title { font-size: clamp(28px, 7vw, 42px) !important; }
		.hero-sub { font-size: 16px; }
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
		.nav { padding: 14px 16px; }
		.logo-name { font-size: 18px; }
		.stats-bar { gap: 20px; flex-wrap: wrap; justify-content: center; }
		.stat-num { font-size: 36px; }
		.stat-label { font-size: 12px; }
		.stat-divider { display: none; }
		.features { grid-template-columns: 1fr; }
		.feature-card h3 { font-size: 20px; }
		.feature-card p { font-size: 17px; }
		.hero-actions { flex-direction: column; align-items: stretch; }
		.hero-actions .btn-primary { text-align: center; justify-content: center; }
		.btn-hero-cta { font-size: 18px; padding: 18px 28px; width: 100%; justify-content: center; }
		.hero-trust { text-align: center; font-size: 12px; }
		.quote { padding: 32px 20px; }
		.quote p { font-size: 22px; }
		.quote-mark { font-size: 80px; }
		.cta-title { font-size: clamp(28px, 7vw, 40px) !important; }
		.squad-form-section { padding: 60px 0; }
		.squad-form-title { font-size: clamp(28px, 7vw, 40px) !important; }
		.squad-form-sub { font-size: 18px; }
		.squad-form { padding: 20px; }
		.form-row { grid-template-columns: 1fr; }
		.form-input { font-size: 16px; }
		.squad-submit { font-size: 17px !important; padding: 14px 20px !important; }
		.btn-primary--large { font-size: 18px; padding: 14px 24px; }
	}
</style>
