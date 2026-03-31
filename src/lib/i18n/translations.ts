export const t = {
	es: {
		// Hero
		heroKicker: 'Laboratorio de Metodología Abierta',
		heroTitle1: 'Equipos de agentes IA',
		heroTitle2: 'probados en el mundo real.',
		heroSub: 'Agent Squad descubre dónde los equipos de agentes IA realmente funcionan — y convierte esos casos en servicios que puedes usar hoy.',
		heroCta: 'Probar Thalx →',
		heroCtaSecondary: 'Unirse a AI4Managers',

		// HowItWorks
		howItWorksLabel: 'Cómo funciona',
		howItWorksHeading: 'De hipótesis a servicio probado',
		step1Num: '01', step1Title: 'Descubrir', step1Desc: 'Identificar dónde los equipos de agentes pueden reemplazar trabajo repetitivo y de múltiples pasos: contenido, operaciones, análisis, onboarding.',
		step2Num: '02', step2Title: 'Validar', step2Desc: 'Ejecutar cargas de trabajo reales a través del stack de agentes. Medir calidad, velocidad y costo contra referencias humanas.',
		step3Num: '03', step3Title: 'Productizar', step3Desc: 'Cuando un caso de uso supera la validación, se convierte en un servicio listo para usar. Thalx es el primero en salir del laboratorio.',

		// Flavors
		flavorsLabel: 'Aplicaciones',
		flavorsHeading: 'Casos de uso en investigación',
		flavorsSub: 'Cada aplicación es una categoría de trabajo que estamos probando con equipos de agentes. Cuando una lo demuestra, se convierte en servicio.',
		flavor1Icon: '🎬', flavor1Title: 'Reaprovechamiento de Video', flavor1Desc: 'Convierte un video largo en 12+ piezas de contenido — clips, shorts, blogs, captions, thumbnails — completamente automatizado.', flavor1Status: 'live', flavor1StatusLabel: 'Disponible', flavor1Cta: 'Ver Thalx →', flavor1Href: 'https://thalx.io',
		flavor2Icon: '🔍', flavor2Title: 'Auditorías de Proceso', flavor2Desc: 'Equipos de agentes que mapean flujos de trabajo, identifican cuellos de botella y detectan oportunidades de mejora operativa.', flavor2Status: 'research', flavor2StatusLabel: 'En investigación',
		flavor3Icon: '🚀', flavor3Title: 'Onboarding de Clientes', flavor3Desc: 'Automatiza la recepción, recopilación de documentos, preparación del kickoff y entregables de la primera semana para negocios de servicios.', flavor3Status: 'research', flavor3StatusLabel: 'En investigación',
		flavor4Icon: '📊', flavor4Title: 'Analítica e Informes', flavor4Desc: 'Monitoreo continuo de métricas de negocio con resúmenes narrativos automáticos y alertas de anomalías.', flavor4Status: 'research', flavor4StatusLabel: 'En investigación',

		// Stats
		statsLabel: 'En números',
		stat1: '12+', stat1l: 'Piezas de contenido por video',
		stat2: '1', stat2l: 'Aplicación activa en producción',
		stat3: '3', stat3l: 'Aplicaciones en investigación activa',
		stat4: '80%', stat4l: 'Tiempo ahorrado vs. producción manual',

		// CTA
		ctaTitle: '¿Listo para usar lo que construyó el lab?',
		ctaSub: 'Empieza con Thalx — el primer servicio de Agent Squad — o sigue la investigación dentro de AI4Managers.',
		ctaBtn: 'Probar Thalx — primer video gratis',
		ctaBtnSecondary: 'Seguir la investigación →',
	},
	en: {
		// Hero
		heroKicker: 'Open Methodology Lab',
		heroTitle1: 'AI agent teams,',
		heroTitle2: 'tested in the real world.',
		heroSub: 'Agent Squad discovers where AI agent teams actually work — then turns those use cases into services you can use today.',
		heroCta: 'Try Thalx →',
		heroCtaSecondary: 'Join AI4Managers',

		// HowItWorks
		howItWorksLabel: 'How It Works',
		howItWorksHeading: 'From hypothesis to proven service',
		step1Num: '01', step1Title: 'Discover', step1Desc: 'Identify where agent teams could replace repetitive, multi-step work — content, operations, analysis, onboarding.',
		step2Num: '02', step2Title: 'Validate', step2Desc: 'Run real workloads through the agent stack. Measure quality, speed, and cost against human baselines.',
		step3Num: '03', step3Title: 'Productize', step3Desc: 'When a use case passes validation, it becomes a done-for-you service. Thalx is the first one out the lab.',

		// Flavors
		flavorsLabel: 'Flavors',
		flavorsHeading: 'Use cases under investigation',
		flavorsSub: 'Each flavor is a category of work we\'re testing with agent teams. When one proves out, it ships as a service.',
		flavor1Icon: '🎬', flavor1Title: 'Video Repurposing', flavor1Desc: 'Turn one long-form video into 12+ pieces of content — clips, shorts, blogs, captions, thumbnails — fully automated.', flavor1Status: 'live', flavor1StatusLabel: 'Live', flavor1Cta: 'See Thalx →', flavor1Href: 'https://thalx.io',
		flavor2Icon: '🔍', flavor2Title: 'Process Audits', flavor2Desc: 'Agent teams that map workflows, identify bottlenecks, and surface optimization opportunities across operations.', flavor2Status: 'research', flavor2StatusLabel: 'In Research',
		flavor3Icon: '🚀', flavor3Title: 'Client Onboarding', flavor3Desc: 'Automate intake, document gathering, kickoff prep, and first-week deliverables for service businesses.', flavor3Status: 'research', flavor3StatusLabel: 'In Research',
		flavor4Icon: '📊', flavor4Title: 'Analytics & Reporting', flavor4Desc: 'Continuous monitoring of business metrics with automated narrative summaries and anomaly alerts.', flavor4Status: 'research', flavor4StatusLabel: 'In Research',

		// Stats
		statsLabel: 'By the numbers',
		stat1: '12+', stat1l: 'Content pieces per video',
		stat2: '1', stat2l: 'Flavor live in production',
		stat3: '3', stat3l: 'Flavors in active research',
		stat4: '80%', stat4l: 'Time saved vs. manual production',

		// CTA
		ctaTitle: 'Ready to use what the lab built?',
		ctaSub: 'Start with Thalx — the first Agent Squad service — or follow the research inside AI4Managers.',
		ctaBtn: 'Try Thalx — first video free',
		ctaBtnSecondary: 'Follow the research →',
	}
} as const;

export type Lang = 'es' | 'en';
export type Translations = typeof t[Lang];

export const meta = {
	es: {
		title: 'Agent Squad — Laboratorio de Metodología de Agentes IA',
		description: 'Agent Squad: laboratorio abierto que descubre dónde los equipos de agentes IA realmente funcionan. El primer servicio productizado es Thalx — automatización de contenido de video.',
		ogTitle: 'Agent Squad — Laboratorio de Metodología Abierta',
		ogDescription: 'Descubrimos dónde los agentes IA realmente funcionan y convertimos esos casos en servicios. El primero: Thalx, automatización de contenido de video.',
		ogLocale: 'es_ES',
		twitterDescription: 'Agent Squad: laboratorio que descubre y productiza casos de uso de agentes IA. Thalx es el primero: video → 12+ piezas de contenido.',
	},
	en: {
		title: 'Agent Squad — AI Agent Methodology Lab',
		description: 'Agent Squad: open methodology lab discovering where AI agent teams actually work. The first productized service is Thalx — video content automation.',
		ogTitle: 'Agent Squad — Open Methodology Lab',
		ogDescription: 'We discover where AI agents actually work and turn those cases into services. First up: Thalx, video content automation.',
		ogLocale: 'en_US',
		twitterDescription: 'Agent Squad: lab that discovers and productizes AI agent use cases. First one: Thalx — one video → 12+ content pieces.',
	}
} as const;

export type Meta = typeof meta['es'];
