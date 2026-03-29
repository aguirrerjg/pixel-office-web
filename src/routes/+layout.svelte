<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { lang } from '$lib/i18n/store.js';
	import { meta } from '$lib/i18n/translations.js';
	import { theme } from '$lib/stores/theme.js';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	let m = $derived(meta[$lang]);

	onMount(() => {
		lang.init();
		theme.init();
	});
</script>

<svelte:head>
	<title>{m.title}</title>
	<meta name="description" content={m.description} />
	<link rel="canonical" href="https://agentsquadai.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={m.ogTitle} />
	<meta property="og:description" content={m.ogDescription} />
	<meta property="og:url" content="https://agentsquadai.com/" />
	<meta property="og:image" content="https://agentsquadai.com/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Agent Squad" />
	<meta property="og:locale" content={m.ogLocale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.ogTitle} />
	<meta name="twitter:image" content="https://agentsquadai.com/og-image.png" />
	<meta name="twitter:description" content={m.twitterDescription} />

	<meta name="robots" content="index, follow" />
	<meta name="author" content="Agent Squad" />
	<meta name="keywords" content="AI Teams as a Service, AI agents, multi-agent orchestration, real-time AI dashboard, autonomous AI, Agent Squad, agentes IA, equipos de IA" />

	{@html `<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="625e06e9-b922-461d-bc68-da2a84077632";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`}

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Agent Squad",
		"url": "https://agentsquadai.com",
		"description": "AI Teams as a Service — equipos de agentes IA autónomos que trabajan 24/7 con monitoreo en tiempo real",
		"sameAs": []
	})}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "Agent Squad",
		"url": "https://agentsquadai.com",
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

<div class="top-stripe" aria-hidden="true"></div>

<div class="bg-layers" aria-hidden="true">
	<div class="bg-grid"></div>
	<div class="bg-radial bg-radial--1"></div>
	<div class="bg-radial bg-radial--2"></div>
	<div class="bg-radial bg-radial--3"></div>
	<div class="bg-watermark">AGENT SQUAD</div>
</div>

<div class="landing">
	<div class="noise" aria-hidden="true"></div>
	<Navbar />
	{@render children()}
</div>
