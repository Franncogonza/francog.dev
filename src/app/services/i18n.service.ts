import { Injectable, signal } from '@angular/core';

export type Language = 'es' | 'en' | 'pt';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    about: string;
    portfolio: string;
    blog: string;
    contact: string;
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
    skills: {
      title: string;
      subtitle: string;
    };
  };
  // About
  about: {
    title: string;
    description: string;
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
    readArticle: string;
    articlesLoaded: string;
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    retry: string;
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
    },
    home: {
      hero: {
        greeting: '👋 Hola, soy',
        title: 'Franco David',
        subtitle: 'Full Stack Developer especializado en Angular, Node.js y arquitectura de sistemas. Construyo productos digitales escalables.',
        cta: 'Ver proyectos',
        ctaSecondary: 'Contactar',
      },
      skills: {
        title: 'Stack Técnico',
        subtitle: 'Tecnologías con las que trabajo día a día',
      },
    },
    about: {
      title: 'Sobre mí',
      description: 'Desarrollador Full Stack con pasión por crear soluciones eficientes y escalables.',
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
      readArticle: 'Leer artículo',
      articlesLoaded: 'artículos cargados',
    },
    contact: {
      title: 'Hablemos.',
      subtitle: 'Si tenés una propuesta, idea o querés colaborar, dejame un mensaje. Respondo normalmente en 24–48h.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: '✅ Enviado',
      retry: '🔄 Reintentar',
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
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
    home: {
      hero: {
        greeting: '👋 Hi, I\'m',
        title: 'Franco David',
        subtitle: 'Full Stack Developer specialized in Angular, Node.js and systems architecture. I build scalable digital products.',
        cta: 'View projects',
        ctaSecondary: 'Contact me',
      },
      skills: {
        title: 'Tech Stack',
        subtitle: 'Technologies I work with every day',
      },
    },
    about: {
      title: 'About me',
      description: 'Full Stack Developer with a passion for creating efficient and scalable solutions.',
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
      readArticle: 'Read article',
      articlesLoaded: 'articles loaded',
    },
    contact: {
      title: 'Let\'s talk.',
      subtitle: 'If you have a proposal, idea or want to collaborate, leave me a message. I usually respond within 24–48h.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      sent: '✅ Sent',
      retry: '🔄 Retry',
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
    },
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre mim',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contato',
    },
    home: {
      hero: {
        greeting: '👋 Olá, sou',
        title: 'Franco David',
        subtitle: 'Desenvolvedor Full Stack especializado em Angular, Node.js e arquitetura de sistemas. Construo produtos digitais escaláveis.',
        cta: 'Ver projetos',
        ctaSecondary: 'Contato',
      },
      skills: {
        title: 'Stack Técnico',
        subtitle: 'Tecnologias com as quais trabalho todos os dias',
      },
    },
    about: {
      title: 'Sobre mim',
      description: 'Desenvolvedor Full Stack com paixão por criar soluções eficientes e escaláveis.',
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
      readArticle: 'Ler artigo',
      articlesLoaded: 'artigos carregados',
    },
    contact: {
      title: 'Vamos conversar.',
      subtitle: 'Se você tem uma proposta, ideia ou quer colaborar, deixe-me uma mensagem. Normalmente respondo em 24–48h.',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando…',
      sent: '✅ Enviado',
      retry: '🔄 Tentar novamente',
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
    },
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLanguage = signal<Language>('es');
  
  constructor() {
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

  get language() {
    return this.currentLanguage();
  }

  get translations(): Translation {
    return translations[this.currentLanguage()];
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
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
