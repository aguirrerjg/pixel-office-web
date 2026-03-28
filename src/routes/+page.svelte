<script>
	import { onMount } from 'svelte';

	let scrollY = 0;
	let navEl;
	let mounted = false;

	let formStatus = 'idle'; // idle | sending | sent
	let theme = 'dark'; // dark | light

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
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

	<!-- Hero — split banner -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title cascade cascade--1">
				Contratar es lento. Entrenar es caro. <em>Tu Squad IA empieza hoy.</em>
			</h1>
			<p class="hero-sub cascade cascade--3">
				Cuéntanos tu operación y en 24 horas diseñamos el equipo de agentes IA que necesitas: qué roles, qué tareas automatizan, y cuántas horas recuperas. Sin costo. Sin compromiso.
			</p>
			<div class="hero-actions cascade cascade--4">
				<button class="btn-hero-cta" onclick={() => window.$crisp?.push(['do', 'chat:open'])}>
					<span class="btn-hero-pulse" aria-hidden="true"></span>
					<span class="btn-hero-text">Quiero mi Squad → Hablemos</span>
					<svg class="btn-hero-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<p class="hero-trust">Sin costo · Sin compromiso · Respuesta inmediata</p>
			</div>
		</div>
		<div class="hero-visual cascade cascade--5">
			<div class="hero-image-glow" aria-hidden="true"></div>
			<a href="https://pixel-office-app.vercel.app/office" class="hero-image-link">
				<img src="/hero-office.webp" alt="Agent Squad — equipos de agentes IA trabajando en tiempo real" class="hero-image" width="1024" height="1049" loading="eager" />
				<div class="hero-image-overlay">
					<span class="hero-image-cta">Ver en vivo →</span>
				</div>
			</a>
		</div>
	</section>

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
		<span class="footer-copy">Agent Squad · Built with SvelteKit 5 &amp; Claude SDK</span>
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

	/* ── Hero (split banner) ── */
	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
		padding: 140px 0 64px;
		min-height: calc(100vh - 140px);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.hero-visual {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
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

	/* ── Hero image ── */
	.hero-image-glow {
		position: absolute;
		inset: -30px;
		border-radius: 32px;
		background: radial-gradient(ellipse at center, var(--gold-glow) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%);
		filter: blur(40px);
		z-index: 0;
		animation: pulseGlow 4s ease-in-out infinite;
	}

	@keyframes pulseGlow {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 0.9; }
	}

	.hero-image-link {
		display: block;
		position: relative;
		z-index: 1;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--gold-border);
		box-shadow: 0 8px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(201, 168, 76, 0.06);
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
		max-width: 480px;
	}

	.hero-image-link:hover {
		transform: translateY(-6px) scale(1.02);
		box-shadow: 0 16px 80px rgba(0, 0, 0, 0.6), 0 0 50px rgba(201, 168, 76, 0.12);
	}

	.hero-image {
		display: block;
		width: 100%;
		height: auto;
	}

	.hero-image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 50%, rgba(7, 7, 15, 0.85) 100%);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 20px;
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	.hero-image-link:hover .hero-image-overlay {
		opacity: 1;
	}

	.hero-image-cta {
		font-family: var(--mono);
		font-size: 18px;
		color: var(--gold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		border: 1px solid var(--gold-border);
		padding: 7px 18px;
		border-radius: 6px;
		background: rgba(201, 168, 76, 0.1);
		backdrop-filter: blur(8px);
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
		.hero { grid-template-columns: 1fr; gap: 40px; }
		.hero-visual { order: -1; }
		.hero-image-link { max-width: 480px; margin: 0 auto; }
		.features { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 640px) {
		.hero { padding: 100px 0 40px; grid-template-columns: 1fr; gap: 24px; min-height: auto; }
		.hero-title { font-size: clamp(32px, 8vw, 48px) !important; }
		.hero-sub { font-size: 18px; }
		.hero-visual { order: -1; }
		.hero-image-link { max-width: 100%; }
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
