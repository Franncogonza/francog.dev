import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private baseUrl = 'https://francodavid.dev';
  private siteName = 'Franco David';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setPageTitle(pageTitle: string): void {
    this.title.setTitle(`${pageTitle} | ${this.siteName}`);
  }

  updateMetaTags(config: SeoConfig): void {
    // Actualizar título
    this.setPageTitle(config.title);

    // Meta description
    this.meta.updateTag({
      name: 'description',
      content: config.description,
    });

    // Keywords
    if (config.keywords) {
      this.meta.updateTag({
        name: 'keywords',
        content: config.keywords,
      });
    }

    // Open Graph (Facebook, LinkedIn, etc)
    this.meta.updateTag({
      property: 'og:title',
      content: config.title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });

    this.meta.updateTag({
      property: 'og:type',
      content: config.type || 'website',
    });

    if (config.image) {
      this.meta.updateTag({
        property: 'og:image',
        content: config.image,
      });
    }

    if (config.url) {
      this.meta.updateTag({
        property: 'og:url',
        content: config.url,
      });
    }

    // Twitter Card
    this.meta.updateTag({
      name: 'twitter:title',
      content: config.title,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });

    if (config.image) {
      this.meta.updateTag({
        name: 'twitter:image',
        content: config.image,
      });
    }

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  }

  setHomePage(): void {
    this.updateMetaTags({
      title: 'Franco David - Full Stack Developer',
      description:
        'Desarrollador Full Stack especializado en Angular, Node.js y arquitectura de sistemas. Construyo productos digitales escalables.',
      keywords: 'developer, angular, nodejs, fullstack, arquitectura',
      type: 'website',
      url: this.baseUrl,
    });
  }

  setAboutPage(): void {
    this.updateMetaTags({
      title: 'Sobre mí',
      description:
        'Conoce mi historia, experiencia y pasión por la tecnología. Especializado en desarrollo Full Stack con Angular y Node.js.',
      keywords: 'developer, about, experience, skills',
      type: 'website',
      url: `${this.baseUrl}/about`,
    });
  }

  setBlogPage(): void {
    this.updateMetaTags({
      title: 'Blog',
      description:
        'Reflexiones, aprendizajes y artículos sobre desarrollo, tecnología, arquitectura y carrera como developer.',
      keywords: 'blog, desarrollo, tecnología, angular, nodejs, arquitectura',
      type: 'website',
      url: `${this.baseUrl}/blog`,
    });
  }

  setBlogPost(title: string, description: string, slug: string, image?: string): void {
    this.updateMetaTags({
      title,
      description,
      keywords: 'blog, desarrollo, angular, nodejs',
      type: 'article',
      image,
      url: `${this.baseUrl}/blog/${slug}`,
    });
  }

  setContactPage(): void {
    this.updateMetaTags({
      title: 'Contacto',
      description: '¿Tienes una pregunta o propuesta? Contáctame a través de este formulario.',
      keywords: 'contact, contacto, email',
      type: 'website',
      url: `${this.baseUrl}/contact`,
    });
  }

  setPortfolioPage(): void {
    this.updateMetaTags({
      title: 'Portfolio',
      description:
        'Proyectos y trabajos realizados. Casos de éxito en arquitectura y desarrollo Full Stack.',
      keywords: 'portfolio, proyectos, cases, fullstack',
      type: 'website',
      url: `${this.baseUrl}/portfolio`,
    });
  }

  /**
   * Inyecta un script JSON-LD en el <head> para datos estructurados (Schema.org)
   * Esto mejora los Rich Snippets en resultados de búsqueda de Google
   */
  private injectJsonLd(schema: Record<string, any>): void {
    // Remover script JSON-LD anterior si existe
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Crear nuevo script JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  /**
   * Schema.org para artículos de blog
   * Mejora Rich Snippets con fecha, autor, imagen
   */
  setBlogPostWithSchema(title: string, description: string, slug: string, date?: string, image?: string): void {
    // Meta tags normales
    this.setBlogPost(title, description, slug, image);

    // JSON-LD para Rich Snippets
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      url: `${this.baseUrl}/blog/${slug}`,
      datePublished: date || new Date().toISOString(),
      dateModified: date || new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: 'Franco David Gonzalez',
        url: this.baseUrl,
        jobTitle: 'Full Stack Developer',
        sameAs: [
          'https://github.com/Franncogonza',
          'https://linkedin.com/in/franco-david-gonzalez',
        ],
      },
      publisher: {
        '@type': 'Person',
        name: 'Franco David Gonzalez',
      },
      ...(image && { image: image }),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${slug}`,
      },
    };

    this.injectJsonLd(schema);
  }

  /**
   * Schema.org para la página principal
   * Mejora Rich Snippets con información de persona/profesional
   */
  setHomePageWithSchema(): void {
    this.setHomePage();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Franco David Gonzalez',
      url: this.baseUrl,
      jobTitle: 'Full Stack Developer',
      description:
        'Desarrollador Full Stack especializado en Angular, Node.js y arquitectura de sistemas. Construyo productos digitales escalables.',
      knowsAbout: ['Angular', 'Node.js', 'TypeScript', 'JavaScript', 'Full Stack Development', 'Software Architecture'],
      sameAs: [
        'https://github.com/Franncogonza',
        'https://linkedin.com/in/franco-david-gonzalez',
      ],
    };

    this.injectJsonLd(schema);
  }
}
