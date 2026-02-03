export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
    detail?: string;
  };
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'sn-triage-copilot',
    title: '🚀 ServiceNow Triage Copilot — Chrome Extension',
    description:
      'Extensión de Chrome (Manifest V3) para análisis inteligente de tickets de ServiceNow con OpenAI GPT-4o-mini. Extracción automática, clasificación con IA, generación de emails ejecutivos y modo seguro con filtros de datos sensibles.',
    technologies: ['Chrome Extension', 'JavaScript ES6+', 'OpenAI API', 'Jest', 'i18n (ES/EN)', 'MV3'],
    links: {
      caseStudy: '/blog/servicenow-triage-copilot-chrome-extension',
      github: 'https://github.com/Franncogonza/sn-triage-copilot',
    },
  },
  {
    id: 'riu-pro-booking',
    title: 'RIU Pro Booking — Motor de Reservas',
    description:
      'Plataforma de reservas de alto tráfico para RIU Hotels. Desarrollo frontend en Angular SSR, optimización de performance, estabilidad en producción crítica y analítica avanzada (GA4).',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'SSR', 'GA4', 'CI/CD'],
    links: {
      caseStudy: '#',
      detail: '#',
    },
  },
  {
    id: 'slack-automation',
    title: 'Slack Automation — Productividad Operativa',
    description:
      'Automatización interna con Slack API y Node.js para optimizar flujos de trabajo, reduciendo más de 30 horas mensuales en tareas repetitivas.',
    technologies: ['Node.js', 'Slack API', 'Automation', 'Webhooks'],
    links: {
      caseStudy: '#',
      github: '#',
    },
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generator — Automatización con IA',
    description:
      'Plataforma basada en OpenAI para generación de contenido y automatización de flujos de trabajo. Enfoque en productividad, reducción de tareas manuales y uso práctico de LLMs — sin hype.',
    technologies: ['OpenAI', 'Node.js', 'Angular', 'Prompt Engineering'],
    links: {
      demo: '#',
      github: '#',
    },
  },
];
