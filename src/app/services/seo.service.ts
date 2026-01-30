import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

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
    private meta: Meta
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
}
