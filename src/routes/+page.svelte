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

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>AI Agent Office — AI Teams as a Service | Watch Your AI Agents Work Live</title>
	<meta name="description" content="AI Agent Office: equipos de agentes IA autónomos que puedes verificar en tiempo real. Dashboard en vivo para ver delegación, errores y progreso — sin reportes manuales. AI Teams as a Service." />
	<link rel="canonical" href="https://pixel-office-web.vercel.app/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="AI Agent Office — AI Teams as a Service" />
	<meta property="og:description" content="Equipos de agentes IA autónomos que puedes verificar en tiempo real. Ve quién delega a quién, detecta bloqueos y confirma progreso — sin esperar reportes. Gratis, sin configuración." />
	<meta property="og:url" content="https://pixel-office-web.vercel.app/" />
	<meta property="og:image" content="https://pixel-office-web.vercel.app/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="AI Agent Office" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="AI Agent Office — AI Teams as a Service" />
	<meta name="twitter:image" content="https://pixel-office-web.vercel.app/og-image.png" />
	<meta name="twitter:description" content="Equipos de agentes IA autónomos que puedes verificar en tiempo real. Dashboard en vivo para ver delegación, errores y progreso. Gratis, sin configuración." />

	<!-- Additional meta -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="AI Agent Office" />
	<meta name="keywords" content="AI Teams as a Service, AI agents, multi-agent orchestration, real-time AI dashboard, autonomous AI, AI Agent Office, agentes IA, equipos de IA" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

	<!-- Organization Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "AI Agent Office",
		"url": "https://pixel-office-web.vercel.app",
		"description": "AI Teams as a Service — equipos de agentes IA autónomos que trabajan 24/7 con monitoreo en tiempo real",
		"sameAs": []
	})}</script>`}

	<!-- SoftwareApplication Schema -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "AI Agent Office",
		"url": "https://pixel-office-web.vercel.app",
		"applicationCategory": "BusinessApplication",
		"operatingSystem": "Web",
		"description": "AI Agent Office: equipos de agentes IA autónomos con dashboard en tiempo real. Verifica delegación, errores y progreso sin reportes manuales. AI Teams as a Service.",
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
				"name": "¿Qué es AI Agent Office?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "AI Agent Office es una plataforma de AI Teams as a Service que permite verificar en tiempo real que tus agentes IA se coordinan correctamente. Dashboard en vivo donde ves delegación, errores y progreso de cada agente sin esperar reportes manuales. Funciona con cualquier cantidad de agentes y plataformas."
				}
			},
			{
				"@type": "Question",
				"name": "¿Cómo funcionan los equipos de agentes IA?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Los equipos de agentes IA en AI Agent Office operan de forma autónoma con visibilidad total. Cada agente muestra su estado real (idle, procesando, delegando) y puedes ver qué agente delegó a quién y por qué — evitando loops infinitos y tareas perdidas. Un dashboard unificado para todos tus agentes, sin importar la plataforma."
				}
			},
			{
				"@type": "Question",
				"name": "¿Qué es AI Teams as a Service?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "AI Teams as a Service es el modelo de AI Agent Office donde empresas acceden a equipos completos de agentes IA autónomos en lugar de agentes individuales. Cada equipo incluye roles especializados que se coordinan entre sí. La diferencia clave: no solo ejecutan tareas, sino que puedes verificar en segundos que no se pierden entre sí."
				}
			},
			{
				"@type": "Question",
				"name": "¿Puedo ver mis agentes IA trabajar en tiempo real?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Sí, esa es la propuesta central de AI Agent Office. El dashboard en vivo muestra el estado de cada agente en tiempo real. Puedes ver delegación visual entre agentes, detectar bloqueos antes de que impacten tu timeline, y todo sin necesidad de login, email ni datos."
				}
			},
			{
				"@type": "Question",
				"name": "¿Cuántos agentes puede tener un equipo de IA?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "AI Agent Office soporta múltiples agentes en paralelo distribuidos en equipos especializados. No hay límite fijo — la arquitectura es escalable y permite agregar agentes y equipos según las necesidades del proyecto. Setup: inmediato."
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
	<div class="bg-watermark">AI AGENT OFFICE</div>
</div>

<div class="landing">
	<!-- Noise texture overlay -->
	<div class="noise" aria-hidden="true"></div>

	<!-- Nav -->
	<nav class="nav" bind:this={navEl}>
		<span class="logo">
			<span class="logo-pixel">AI</span>
			<span class="logo-name">Agent Office</span>
		</span>
		<a href="https://pixel-office-app.vercel.app/office" class="nav-cta">Open Dashboard →</a>
	</nav>

	<!-- Hero -->
	<section class="hero">
		<div class="hero-badge cascade cascade--1">AI Teams as a Service · Orquestación en tiempo real</div>
		<h1 class="hero-title cascade cascade--2">
			Ver trabajar tu equipo de IA<br />
			<em>antes de confiar en él.</em>
		</h1>
		<p class="hero-sub cascade cascade--3">
			Tus agentes IA ejecutan. Tú verificas que no se pierdan entre sí. Dashboard en tiempo real que elimina la incertidumbre de la orquestación autónoma.
		</p>
		<div class="hero-actions cascade cascade--4">
			<a href="https://pixel-office-app.vercel.app/office" class="btn-primary">Ver demo en vivo (30 segundos)</a>
			<span class="hero-hint">Gratis, sin datos, sin email</span>
		</div>

	</section>

	<!-- Hero image — "This is what you get" -->
	<div class="hero-image-wrap cascade cascade--5">
		<div class="hero-image-glow" aria-hidden="true"></div>
		<a href="https://pixel-office-app.vercel.app/office" class="hero-image-link">
			<img src="/hero-office.webp" alt="AI Agent Office — equipos de agentes IA trabajando en tiempo real" class="hero-image" width="1024" height="1049" loading="eager" />
			<div class="hero-image-overlay">
				<span class="hero-image-cta">Ver en vivo →</span>
			</div>
		</a>
		<p class="hero-image-caption">Así se ve tu equipo de IA trabajando. En tiempo real. Ahora mismo.</p>
	</div>

	<!-- Stats bar -->
	<div class="stats-bar">
		<div class="stat">
			<span class="stat-num">Segundos</span>
			<span class="stat-label">Para verificar estado de todo tu equipo</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">Cero</span>
			<span class="stat-label">Reportes manuales necesarios</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">N</span>
			<span class="stat-label">Agentes. Tú defines cuántos.</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat">
			<span class="stat-num">0</span>
			<span class="stat-label">Configuración. Funciona ya.</span>
		</div>
	</div>

	<!-- Feature cards -->
	<section class="features">
		<div class="feature-card" style="--card-delay: 0s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">◉</div>
			<h3>Visibilidad sin supervisión</h3>
			<p>Cada agente muestra estado real (idle, procesando, delegando). Detecta bloqueos antes de que impacten tu timeline.</p>
		</div>
		<div class="feature-card feature-card--accent" style="--card-delay: 0.1s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">✈</div>
			<h3>Delegación visual (sin sorpresas)</h3>
			<p>Ver qué agente delegó a quién y por qué. Sin loops infinitos, sin tareas perdidas. Un click en vez de perseguir updates.</p>
		</div>
		<div class="feature-card" style="--card-delay: 0.2s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">⬡</div>
			<h3>Un panel para todos tus agentes</h3>
			<p>No importa dónde corren tus agentes. Un dashboard unificado para verlos a todos. Menos tabs, más claridad.</p>
		</div>
		<div class="feature-card" style="--card-delay: 0.3s">
			<div class="feature-glow" aria-hidden="true"></div>
			<div class="feature-icon">⚡</div>
			<h3>Respuesta sin lag</h3>
			<p>Actualizaciones instantáneas. Cada cambio de estado aparece en tiempo real. La diferencia entre saber y adivinar.</p>
		</div>
	</section>

	<!-- Quote -->
	<section class="quote-section">
		<blockquote class="quote">
			<div class="quote-mark" aria-hidden="true">"</div>
			<p>"Pasamos de revisar reportes manuales cada 30 min a confiar en que nuestros agentes se auto-corrigen en tiempo real. AI Agent Office es el único lugar donde vemos eso suceder."</p>
			<cite>— Coordinador de Equipos IA, 2026</cite>
		</blockquote>
	</section>

	<!-- Final CTA -->
	<section class="cta-section">
		<h2 class="cta-title">No es sólo observar. Es confiar.</h2>
		<p style="font-size: 16px; color: var(--text-muted); margin: 0 0 32px;">Verifica en 30 segundos que tus agentes no se pierden entre sí.</p>
		<a href="https://pixel-office-app.vercel.app/office" class="btn-primary btn-primary--large">Abrir demo en vivo</a>
		<p style="font-family: var(--mono); font-size: 13px; color: var(--text-muted); margin-top: 16px;">✓ Gratis · ✓ 0 configuración · ✓ 0 datos sensibles · ✓ Cierra cuando quieras</p>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<span class="footer-logo">AI</span>
		<span class="footer-copy">AI Agent Office · Built with SvelteKit 5 &amp; Claude SDK</span>
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

	/* ── Hero image ── */
	.hero-image-wrap {
		position: relative;
		max-width: 680px;
		margin: 0 auto 64px;
	}

	.hero-image-glow {
		position: absolute;
		inset: -40px;
		border-radius: 32px;
		background: radial-gradient(ellipse at center, var(--gold-glow) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%);
		filter: blur(40px);
		z-index: 0;
		animation: pulseGlow 4s ease-in-out infinite;
	}

	@keyframes pulseGlow {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}

	.hero-image-link {
		display: block;
		position: relative;
		z-index: 1;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--gold-border);
		box-shadow: 0 8px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 168, 76, 0.08);
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
	}

	.hero-image-link:hover {
		transform: translateY(-6px) scale(1.01);
		box-shadow: 0 16px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(201, 168, 76, 0.15);
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
		padding-bottom: 24px;
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	.hero-image-link:hover .hero-image-overlay {
		opacity: 1;
	}

	.hero-image-cta {
		font-family: var(--mono);
		font-size: 14px;
		color: var(--gold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		border: 1px solid var(--gold-border);
		padding: 8px 20px;
		border-radius: 6px;
		background: rgba(201, 168, 76, 0.1);
		backdrop-filter: blur(8px);
	}

	.hero-image-caption {
		text-align: center;
		font-family: var(--mono);
		font-size: 13px;
		color: var(--text-muted);
		margin: 16px 0 0;
		position: relative;
		z-index: 1;
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
		animation: cascadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.1s forwards;
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
		.hero-image-wrap { margin-bottom: 40px; }
	}
</style>
