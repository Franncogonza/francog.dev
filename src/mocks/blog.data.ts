import { BlogPost } from '../model/blogspot.interface';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '6',
    title: '🚀 ServiceNow Triage Copilot: Chrome Extension con IA',
    description:
      'Cómo construí una extensión de Chrome profesional con OpenAI GPT-4o-mini para automatizar el análisis de tickets de ServiceNow. Arquitectura, refactorización y buenas prácticas.',
    slug: 'servicenow-triage-copilot-chrome-extension',
    date: '2026-02-02',
    tags: ['Chrome Extension', 'OpenAI', 'JavaScript', 'Jest', 'i18n'],
    emoji: '🚀',
    content: `
### 🚀 ServiceNow Triage Copilot: Chrome Extension con IA

**TL;DR:** Construí una extensión de Chrome (Manifest V3) que extrae tickets de ServiceNow, los analiza con OpenAI GPT-4o-mini y genera emails ejecutivos automáticamente. Incluye modo seguro, multi-idioma, tests unitarios y arquitectura modular.

---

## 🎯 El Problema

Como desarrollador trabajando con ServiceNow, pasaba **horas analizando tickets** manualmente:
- Contar tickets por estado (Abierto, En curso, Pendiente...)
- Clasificar prioridades
- Generar reportes ejecutivos
- Redactar emails de seguimiento

**Solución:** Automatizar todo con IA.

---

## 🏗️ Stack Técnico

**Core:**
- JavaScript ES6+ (Vanilla, sin frameworks)
- Chrome Extension Manifest V3
- OpenAI GPT-4o-mini API

**Arquitectura:**
- \`business-logic.js\` - Lógica de negocio pura (funciones sin estado)
- \`state-manager.js\` - Gestión centralizada de estado (AppState class)
- \`i18n.js\` - Internacionalización (ES/EN)
- \`content.js\` - Extracción de datos del DOM de ServiceNow
- \`background.js\` - Service Worker para comunicación
- \`popup.js\` - UI y eventos

**Testing:**
- Jest (25+ tests unitarios)
- Coverage configurado al 50%
- Mocks de Chrome API

---

## ✨ Funcionalidades Clave

### 📊 Extracción Automática
- Scraping del DOM de ServiceNow (\`*_list.do\`)
- Extrae: número, descripción, estado, prioridad, asignado
- Guarda en \`chrome.storage.local\`

### 🤖 Análisis con IA
- Integración con OpenAI GPT-4o-mini
- Prompt engineering optimizado
- Timeout de 30s con manejo de errores
- Validación de API Key (formato \`sk-\`)

### 📧 Generación de Emails
- Email ejecutivo con resumen profesional
- Email de factura con plantilla personalizable
- Apertura automática en Gmail con datos pre-llenados
- Configuración de cuenta de Gmail (multi-cuenta)

### 🔒 Modo Seguro
- Filtra emails, IPs, URLs y datos sensibles
- Regex patterns para detección
- Activable/desactivable por el usuario

### 🌍 Multi-idioma
- Español e Inglés
- Detección automática del navegador
- Selector manual en la UI
- Todas las traducciones completas

---

## 🛠️ Refactorización y Buenas Prácticas

### Separación de Responsabilidades

**Antes:**
\`\`\`javascript
// Todo mezclado en popup.js
let currentTickets = [];
function renderTickets() { /* 200 líneas */ }
\`\`\`

**Después:**
\`\`\`javascript
// business-logic.js
export const countTicketsByState = (tickets) => { /* pura */ };

// state-manager.js
export class AppState {
  setTickets(tickets) { /* centralizado */ }
}

// popup.js
const state = new AppState();
state.setTickets(tickets);
\`\`\`

### Seguridad XSS

**Eliminado 100% de \`innerHTML\`:**
\`\`\`javascript
// ❌ ANTES
ticketsList.innerHTML = '<div>' + ticket.title + '</div>';

// ✅ AHORA
const div = document.createElement('div');
div.textContent = ticket.title;
ticketsList.appendChild(div);
\`\`\`

### Gestión de Estado

**State Manager centralizado:**
\`\`\`javascript
class AppState {
  #tickets = [];
  #apiKey = null;
  #config = { nombre: '', destinatario: '', cc: '', cuentaIndex: 2 };

  async initialize() {
    const data = await chrome.storage.sync.get(['API_KEY', 'FACTURA_CONFIG']);
    this.#apiKey = data.API_KEY;
    this.#config = { ...this.#config, ...data.FACTURA_CONFIG };
  }

  getTickets() { return [...this.#tickets]; }
  setTickets(tickets) { this.#tickets = tickets; }
}
\`\`\`

---

## 🎨 UX Mejorada

### Scroll Automático
Cuando el usuario hace clic en cualquier botón que genera contenido, la UI hace scroll automático al resultado:

\`\`\`javascript
const scrollToResult = () => {
  setTimeout(() => {
    analysisResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
};

// Aplicado en todos los botones
generateReportBtn.addEventListener('click', () => {
  // ... generar reporte
  scrollToResult();
});
\`\`\`

### Iconos Profesionales
Generados con Python + Pillow:
- 16x16px (toolbar)
- 48x48px (extensiones)
- 128x128px (Chrome Web Store)

Diseño: Cohete blanco 🚀 sobre gradiente azul.

---

## 🧪 Testing

**Jest configurado con:**
\`\`\`json
{
  "testEnvironment": "jsdom",
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  }
}
\`\`\`

**Tests de business logic:**
\`\`\`javascript
describe('countTicketsByState', () => {
  it('should count tickets by state correctly', () => {
    const tickets = [
      { state: 'Abierto' },
      { state: 'En curso' },
      { state: 'Abierto' }
    ];
    const counts = countTicketsByState(tickets);
    expect(counts.abierto).toBe(2);
    expect(counts.enCurso).toBe(1);
  });
});
\`\`\`

---

## 📜 Licencia Propietaria

**Protección legal:**
- Copyright © 2026 Franco David Gonzalez
- All Rights Reserved
- Solo visualización educativa/portfolio
- NO uso comercial
- NO modificaciones
- NO distribución

**Badge en README:**
\`\`\`markdown
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red.svg)](LICENSE)
\`\`\`

---

## 📊 Resultados

**Antes:**
- ⏱️ 15-20 min analizando tickets manualmente
- 📝 10 min redactando email ejecutivo
- 🔄 Proceso repetitivo y propenso a errores

**Después:**
- ⚡ 2 segundos extrayendo tickets
- 🤖 5 segundos generando análisis con IA
- ✅ 1 click para abrir Gmail con email listo

**Ahorro:** ~25 minutos por análisis × 10 análisis/semana = **4+ horas/semana**

---

## 🔗 Links

- **GitHub:** [github.com/Franncogonza/sn-triage-copilot](https://github.com/Franncogonza/sn-triage-copilot)
- **Licencia:** All Rights Reserved (código visible, uso restringido)

---

## 🎓 Aprendizajes Clave

1. **Manifest V3 es diferente:** Service Workers en lugar de background pages
2. **Separación de responsabilidades:** Módulos pequeños y testeables
3. **XSS prevention:** Nunca usar \`innerHTML\`
4. **State management:** Centralizar estado evita bugs
5. **i18n desde el inicio:** Más fácil que agregar después
6. **Tests unitarios:** Detectan bugs antes de producción
7. **Licencia clara:** Protege tu trabajo legalmente

---

## 🚀 Próximos Pasos

- [ ] Publicar en Chrome Web Store
- [ ] Agregar soporte para Jira
- [ ] Dashboard con estadísticas históricas
- [ ] Integración con Notion/Slack

---

**¿Te resultó útil?** Dale una ⭐ en GitHub y compartí el proyecto.

**¿Preguntas?** Dejá un comentario o contactame.
    `,
  },
  {
    id: '1',
    title: 'Cómo construí este sitio con Angular SSR + Tailwind',
    description:
      'Te cuento el paso a paso técnico, los desafíos y aprendizajes para llevar Angular a producción con Server Side Rendering en Vercel.',
    slug: 'construyendo-sitio-angular-ssr-tailwind',
    date: '2025-05-20',
    tags: ['Angular', 'Tailwind', 'SSR'],
    emoji: '🚀',
    content: `
### 🚀 Cómo construí este sitio con Angular SSR + Tailwind

En este post te cuento cómo levanté este sitio profesional con Angular SSR (Server Side Rendering) más TailwindCSS.

**Stack utilizado:** Angular 17 + Angular SSR + Tailwind + Vercel.

- Diseño responsivo con Tailwind.
- SSR para mejorar SEO y performance.
- Despliegue en Vercel con CI/CD.

👉 Además integro Signals y arquitectura standalone. Un sitio simple pero robusto, escalable y performante.
    `,
  },
  {
    id: '2',
    title: 'Cómo pienso mi carrera como dev en 2025',
    description:
      'Mi estrategia para mantenerme competitivo: full-stack, IA, sistemas propios y crecimiento personal constante.',
    slug: 'carrera-dev-2025',
    date: '2025-05-18',
    tags: ['Carrera', 'IA', 'FullStack'],
    emoji: '🧠',
    content: `
### 🧠 Cómo pienso mi carrera como dev en 2025

No solo se trata de codear. Mi carrera hoy se basa en 3 pilares:

1. **Full-Stack extremo:** Angular + Node.js + DevOps.
2. **IA aplicada:** bots, automatización y copilotos personalizados.
3. **Sistemas propios:** construir productos, no solo proyectos de clientes.

Mi foco es escalar como Arquitecto, automatizar todo lo posible y crear activos digitales.
    `,
  },
  {
    id: '3',
    title: 'Automatización: cómo ahorré 30h/mes con IA + Slack',
    description:
      'Cómo diseñé bots para Slack que automatizan tareas repetitivas y mejoran mi productividad en proyectos reales.',
    slug: 'automatizacion-ia-slack',
    date: '2025-05-15',
    tags: ['IA', 'Slack', 'Automation'],
    emoji: '⚙️',
    content: `
### ⚙️ Cómo ahorré +30h al mes con Slack + IA

Automatizar es mi deporte.

- Bots que organizan tareas recurrentes.
- Notificaciones inteligentes para errores en producción.
- IA que redacta resúmenes, responde preguntas y ejecuta scripts.

Cada minuto que recupero lo invierto en construir mejores sistemas o descansar.
    `,
  },
  {
    id: '4',
    title: 'Cómo escalar APIs con Node.js + AWS',
    description:
      'Claves para diseñar APIs robustas y escalables usando Node.js, NestJS, bases SQL/NoSQL y servicios AWS.',
    slug: 'escalar-apis-node-aws',
    date: '2025-05-10',
    tags: ['Node.js', 'AWS', 'Backend'],
    emoji: '🌐',
    content: `
### 🌐 Cómo escalar APIs con Node.js + AWS

Para que tu API soporte miles de peticiones por segundo necesitas:

- Node.js con NestJS para estructura limpia.
- Bases de datos PostgreSQL + Mongo según el caso.
- AWS (Lambda, ECS, RDS) para escalar horizontalmente.

Conclusión: **Diseña pensando en el fallo, no en que funcione.**
    `,
  },
  {
    id: '5',
    title: 'De dev a arquitecto: mi roadmap Full-Stack + IA',
    description:
      'El plan concreto que estoy ejecutando para evolucionar a Arquitecto Full-Stack con IA aplicada, DevOps y sistemas propios.',
    slug: 'roadmap-arquitecto-fullstack-ia',
    date: '2025-05-01',
    tags: ['FullStack', 'IA', 'Arquitectura'],
    emoji: '🚀',
    content: `
### 🚀 De dev a arquitecto: mi roadmap Full-Stack + IA

Mi evolución:

1. **Backend robusto:** Node.js + Nest + PostgreSQL/Mongo + JWT.
2. **Frontend elite:** Angular SSR + Signals + Tailwind.
3. **Infra y DevOps:** AWS, Docker, CI/CD, monitoring.
4. **IA aplicada:** bots, asistentes, copilotos.
5. **Estrategia:** Sistemas propios + Marca personal + Consultoría.

Este no es un trabajo, es un juego infinito de construir.
    `,
  },
];
