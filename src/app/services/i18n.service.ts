import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'es' | 'en' | 'pt';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    about: string;
    portfolio: string;
    blog: string;
    contact: string;
    downloadCV: string;
  };
  // Common
  common: {
    available: string;
    backToBlog: string;
    postNotFound: string;
    postNotFoundDesc: string;
  };
  // Home
  home: {
    hero: {
      greeting: string;
      title: string;
      subtitle: string;
      cta: string;
      ctaSecondary: string;
    };
    experience: {
      title: string;
      subtitle: string;
      businessImpact: string;
      businessImpactDesc: string;
      incidentManagement: string;
      incidentManagementDesc: string;
      refactoring: string;
      refactoringDesc: string;
      aiAndFuture: string;
      aiAndFutureDesc: string;
    };
    focus: {
      title: string;
      angular: string;
      angularDesc: string;
      performance: string;
      performanceDesc: string;
      leadership: string;
      leadershipDesc: string;
    };
  };
  // About
  about: {
    title: string;
    intro: string;
    currentRole: string;
    leadership: string;
    aiTraining: string;
    skillsTitle: string;
  };
  // Portfolio
  portfolio: {
    title: string;
    caseStudy: string;
    viewDemo: string;
    viewGithub: string;
    technicalDetail: string;
  };
  // Blog
  blog: {
    title: string;
    subtitle: string;
    loading: string;
    error: string;
    retry: string;
    noArticles: string;
    noArticlesHint: string;
    readArticle: string;
    articlesLoaded: string;
    showingCache: string;
    minRead: string;
  };
  // Contact
  contact: {
    label: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    retry: string;
    success: string;
    minChars: string;
    alternativeHint: string;
    errors: {
      nameRequired: string;
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMin: string;
    };
  };
  // Footer
  footer: {
    rights: string;
    madeWith: string;
    contact: string;
  };
}

const translations: Record<Language, Translation> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contacto',
      downloadCV: 'Descargar CV',
    },
    common: {
      available: 'Disponible para oportunidades (Remote-first)',
      backToBlog: 'Volver al Blog',
      postNotFound: 'Post no encontrado 😢',
      postNotFoundDesc: 'El artículo que buscas no existe o fue removido.',
    },
    home: {
      hero: {
        greeting: 'Hola, soy',
        title: 'Franco',
        subtitle: 'Tech Lead & Angular Developer. Más de 6 años construyendo productos reales. Actualmente trabajo en el motor de reservas de RIU Hotels, en entornos de alto tráfico y producción crítica. Foco en estabilidad, performance, calidad de código y arquitectura frontend mantenible.',
        cta: 'Ver portfolio',
        ctaSecondary: 'Contactar',
      },
      experience: {
        title: 'Experiencia en Producción Real',
        subtitle: 'Más allá del código: gestión de sistemas críticos donde la estabilidad es la prioridad.',
        businessImpact: 'Impacto en Negocio',
        businessImpactDesc: 'Resolución de +900 incidencias productivas (B2B/B2C), contribuyendo a la estabilidad y continuidad operativa de una plataforma de alto tráfico.',
        incidentManagement: 'Gestión de Incidentes',
        incidentManagementDesc: 'Liderazgo de célula crítica: Análisis de causa raíz (RCA), coordinación técnica y resolución de issues complejos bajo presión.',
        refactoring: 'Refactorización & Performance',
        refactoringDesc: 'Reducción de deuda técnica, optimización de bundles y mejora medible de tiempos de carga en módulos críticos.',
        aiAndFuture: 'IA & Futuro',
        aiAndFutureDesc: 'Formación en IA Generativa & LLMs (PUC-Rio), orientada a automatización aplicada a ingeniería de software.',
      },
      focus: {
        title: 'Áreas de Foco',
        angular: 'Angular Architecture',
        angularDesc: 'Arquitecturas Angular modulares y mantenibles, con foco en escalabilidad, SSR cuando aporta valor y sostenibilidad técnica del producto.',
        performance: 'Alto Rendimiento',
        performanceDesc: 'Optimización de performance, análisis de cuellos de botella, mejora de tiempos de carga y estabilidad en entornos de alto tráfico.',
        leadership: 'Liderazgo Técnico',
        leadershipDesc: 'Liderazgo técnico, definición de estándares, code reviews, coordinación entre ingeniería, QA y producto.',
      },
    },
    about: {
      title: 'Sobre mí — Perfil profesional',
      intro: 'Soy Franco Gonzalez, Tech Lead & Angular Developer, con más de 6 años trabajando en productos reales en entornos de producción.',
      currentRole: 'Actualmente trabajo en RIU Hotels, optimizando el motor de reservas en contextos de alto tráfico, con foco en performance, estabilidad y arquitectura frontend mantenible.',
      leadership: 'Lidero iniciativas de gestión de incidentes en producción crítica, refactorización técnica, code reviews y mejora continua en calidad de código.',
      aiTraining: 'Me estoy formando en IA Generativa & LLMs (PUC-Rio), con foco en automatización aplicada a ingeniería de software.',
      skillsTitle: 'Habilidades Técnicas 🛠️',
    },
    portfolio: {
      title: 'Proyectos Seleccionados',
      caseStudy: 'Leer Case Study',
      viewDemo: 'Ver Demo',
      viewGithub: 'Ver en GitHub',
      technicalDetail: 'Detalle Técnico',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Notas técnicas sobre performance, arquitectura frontend, producción y automatización con IA (sin hype).',
      loading: 'Cargando artículos…',
      error: 'No se pudieron cargar los artículos.',
      retry: 'Reintentar',
      noArticles: 'Todavía no hay artículos publicados.',
      noArticlesHint: 'Publicaré notas técnicas a medida que avance con proyectos y aprendizajes en producción.',
      readArticle: 'Leer artículo',
      articlesLoaded: 'artículos cargados',
      showingCache: 'Mostrando caché si hay datos disponibles.',
      minRead: 'min de lectura',
    },
    contact: {
      label: 'Contacto',
      title: 'Hablemos.',
      subtitle: 'Si tenés una propuesta, idea o querés colaborar, dejame un mensaje. Respondo normalmente en 24–48h.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: '✅ Enviado',
      retry: '🔄 Reintentar',
      success: '✅ Mensaje enviado. Te respondo pronto.',
      minChars: 'Mínimo 10 caracteres',
      alternativeHint: 'Alternativa rápida: LinkedIn (recomendado) o email profesional.',
      errors: {
        nameRequired: 'El nombre es obligatorio.',
        nameMin: 'Mínimo 3 caracteres.',
        emailRequired: 'El email es obligatorio.',
        emailInvalid: 'Email no válido.',
        messageRequired: 'El mensaje es obligatorio.',
        messageMin: 'Mínimo 10 caracteres.',
      },
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      madeWith: 'Hecho con',
      contact: 'Contacto',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
      downloadCV: 'Download CV',
    },
    common: {
      available: 'Available for opportunities (Remote-first)',
      backToBlog: 'Back to Blog',
      postNotFound: 'Post not found 😢',
      postNotFoundDesc: 'The article you are looking for does not exist or was removed.',
    },
    home: {
      hero: {
        greeting: 'Hi, I\'m',
        title: 'Franco',
        subtitle: 'Tech Lead & Angular Developer. 6+ years building real products. Currently working on the RIU Hotels booking engine, in high-traffic and critical production environments. Focus on stability, performance, code quality and maintainable frontend architecture.',
        cta: 'View portfolio',
        ctaSecondary: 'Contact me',
      },
      experience: {
        title: 'Real Production Experience',
        subtitle: 'Beyond code: managing critical systems where stability is the priority.',
        businessImpact: 'Business Impact',
        businessImpactDesc: 'Resolution of 900+ production incidents (B2B/B2C), contributing to stability and operational continuity of a high-traffic platform.',
        incidentManagement: 'Incident Management',
        incidentManagementDesc: 'Critical cell leadership: Root cause analysis (RCA), technical coordination and resolution of complex issues under pressure.',
        refactoring: 'Refactoring & Performance',
        refactoringDesc: 'Technical debt reduction, bundle optimization and measurable improvement of load times in critical modules.',
        aiAndFuture: 'AI & Future',
        aiAndFutureDesc: 'Training in Generative AI & LLMs (PUC-Rio), focused on automation applied to software engineering.',
      },
      focus: {
        title: 'Focus Areas',
        angular: 'Angular Architecture',
        angularDesc: 'Modular and maintainable Angular architectures, focused on scalability, SSR when it adds value and technical sustainability.',
        performance: 'High Performance',
        performanceDesc: 'Performance optimization, bottleneck analysis, load time improvement and stability in high-traffic environments.',
        leadership: 'Technical Leadership',
        leadershipDesc: 'Technical leadership, standards definition, code reviews, coordination between engineering, QA and product.',
      },
    },
    about: {
      title: 'About me — Professional Profile',
      intro: 'I\'m Franco Gonzalez, Tech Lead & Angular Developer, with 6+ years working on real products in production environments.',
      currentRole: 'Currently working at RIU Hotels, optimizing the booking engine in high-traffic contexts, focused on performance, stability and maintainable frontend architecture.',
      leadership: 'I lead initiatives in critical production incident management, technical refactoring, code reviews and continuous improvement in code quality.',
      aiTraining: 'I\'m training in Generative AI & LLMs (PUC-Rio), focused on automation applied to software engineering.',
      skillsTitle: 'Technical Skills 🛠️',
    },
    portfolio: {
      title: 'Selected Projects',
      caseStudy: 'Read Case Study',
      viewDemo: 'View Demo',
      viewGithub: 'View on GitHub',
      technicalDetail: 'Technical Detail',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Technical notes on performance, frontend architecture, production and AI automation (no hype).',
      loading: 'Loading articles…',
      error: 'Could not load articles.',
      retry: 'Retry',
      noArticles: 'No articles published yet.',
      noArticlesHint: 'I\'ll publish technical notes as I progress with projects and production learnings.',
      readArticle: 'Read article',
      articlesLoaded: 'articles loaded',
      showingCache: 'Showing cache if data is available.',
      minRead: 'min read',
    },
    contact: {
      label: 'Contact',
      title: 'Let\'s talk.',
      subtitle: 'If you have a proposal, idea or want to collaborate, leave me a message. I usually respond within 24–48h.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      sent: '✅ Sent',
      retry: '🔄 Retry',
      success: '✅ Message sent. I\'ll respond soon.',
      minChars: 'Minimum 10 characters',
      alternativeHint: 'Quick alternative: LinkedIn (recommended) or professional email.',
      errors: {
        nameRequired: 'Name is required.',
        nameMin: 'Minimum 3 characters.',
        emailRequired: 'Email is required.',
        emailInvalid: 'Invalid email.',
        messageRequired: 'Message is required.',
        messageMin: 'Minimum 10 characters.',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      madeWith: 'Made with',
      contact: 'Contact',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre mim',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contato',
      downloadCV: 'Baixar CV',
    },
    common: {
      available: 'Disponível para oportunidades (Remote-first)',
      backToBlog: 'Voltar ao Blog',
      postNotFound: 'Post não encontrado 😢',
      postNotFoundDesc: 'O artigo que você está procurando não existe ou foi removido.',
    },
    home: {
      hero: {
        greeting: 'Olá, sou',
        title: 'Franco',
        subtitle: 'Tech Lead & Angular Developer. 6+ anos construindo produtos reais. Atualmente trabalho no motor de reservas do RIU Hotels, em ambientes de alto tráfego e produção crítica. Foco em estabilidade, performance, qualidade de código e arquitetura frontend sustentável.',
        cta: 'Ver portfolio',
        ctaSecondary: 'Contato',
      },
      experience: {
        title: 'Experiência em Produção Real',
        subtitle: 'Além do código: gestão de sistemas críticos onde a estabilidade é prioridade.',
        businessImpact: 'Impacto no Negócio',
        businessImpactDesc: 'Resolução de +900 incidências produtivas (B2B/B2C), contribuindo para a estabilidade e continuidade operacional de uma plataforma de alto tráfego.',
        incidentManagement: 'Gestão de Incidentes',
        incidentManagementDesc: 'Liderança de célula crítica: Análise de causa raiz (RCA), coordenação técnica e resolução de issues complexos sob pressão.',
        refactoring: 'Refatoração & Performance',
        refactoringDesc: 'Redução de dívida técnica, otimização de bundles e melhoria mensurável de tempos de carga em módulos críticos.',
        aiAndFuture: 'IA & Futuro',
        aiAndFutureDesc: 'Formação em IA Generativa & LLMs (PUC-Rio), orientada à automação aplicada à engenharia de software.',
      },
      focus: {
        title: 'Áreas de Foco',
        angular: 'Arquitetura Angular',
        angularDesc: 'Arquiteturas Angular modulares e sustentáveis, com foco em escalabilidade, SSR quando agrega valor e sustentabilidade técnica.',
        performance: 'Alto Desempenho',
        performanceDesc: 'Otimização de performance, análise de gargalos, melhoria de tempos de carga e estabilidade em ambientes de alto tráfego.',
        leadership: 'Liderança Técnica',
        leadershipDesc: 'Liderança técnica, definição de padrões, code reviews, coordenação entre engenharia, QA e produto.',
      },
    },
    about: {
      title: 'Sobre mim — Perfil profissional',
      intro: 'Sou Franco Gonzalez, Tech Lead & Angular Developer, com 6+ anos trabalhando em produtos reais em ambientes de produção.',
      currentRole: 'Atualmente trabalho no RIU Hotels, otimizando o motor de reservas em contextos de alto tráfego, com foco em performance, estabilidade e arquitetura frontend sustentável.',
      leadership: 'Lidero iniciativas de gestão de incidentes em produção crítica, refatoração técnica, code reviews e melhoria contínua na qualidade de código.',
      aiTraining: 'Estou me formando em IA Generativa & LLMs (PUC-Rio), com foco em automação aplicada à engenharia de software.',
      skillsTitle: 'Habilidades Técnicas 🛠️',
    },
    portfolio: {
      title: 'Projetos Selecionados',
      caseStudy: 'Ler Case Study',
      viewDemo: 'Ver Demo',
      viewGithub: 'Ver no GitHub',
      technicalDetail: 'Detalhe Técnico',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Notas técnicas sobre performance, arquitetura frontend, produção e automação com IA (sem hype).',
      loading: 'Carregando artigos…',
      error: 'Não foi possível carregar os artigos.',
      retry: 'Tentar novamente',
      noArticles: 'Ainda não há artigos publicados.',
      noArticlesHint: 'Publicarei notas técnicas à medida que avançar com projetos e aprendizados em produção.',
      readArticle: 'Ler artigo',
      articlesLoaded: 'artigos carregados',
      showingCache: 'Mostrando cache se houver dados disponíveis.',
      minRead: 'min de leitura',
    },
    contact: {
      label: 'Contato',
      title: 'Vamos conversar.',
      subtitle: 'Se você tem uma proposta, ideia ou quer colaborar, deixe-me uma mensagem. Normalmente respondo em 24–48h.',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando…',
      sent: '✅ Enviado',
      retry: '🔄 Tentar novamente',
      success: '✅ Mensagem enviada. Respondo em breve.',
      minChars: 'Mínimo 10 caracteres',
      alternativeHint: 'Alternativa rápida: LinkedIn (recomendado) ou email profissional.',
      errors: {
        nameRequired: 'O nome é obrigatório.',
        nameMin: 'Mínimo 3 caracteres.',
        emailRequired: 'O email é obrigatório.',
        emailInvalid: 'Email inválido.',
        messageRequired: 'A mensagem é obrigatória.',
        messageMin: 'Mínimo 10 caracteres.',
      },
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      madeWith: 'Feito com',
      contact: 'Contato',
    },
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLanguage = signal<Language>('es');
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  constructor() {
    if (this.isBrowser) {
      // Detectar idioma del navegador
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['es', 'en', 'pt'].includes(browserLang)) {
        this.currentLanguage.set(browserLang);
      }
      
      // Cargar idioma guardado
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && ['es', 'en', 'pt'].includes(savedLang)) {
        this.currentLanguage.set(savedLang);
      }
    }
  }

  get language() {
    return this.currentLanguage();
  }

  // Computed signal para que sea reactivo
  translations = computed(() => translations[this.currentLanguage()]);

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations;
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) return key;
    }
    
    return value;
  }
}
