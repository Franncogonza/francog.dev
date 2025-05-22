import { BlogPost } from '../model/blogspot.interface';

export const BLOG_POSTS: BlogPost[] = [
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
