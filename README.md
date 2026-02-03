# 🚀 Franco David - Portfolio Personal

Portfolio profesional y blog técnico construido con Angular SSR, TailwindCSS y arquitectura moderna.

[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Live:** [francodavid.dev](https://francodavid.dev)

---

## ✨ Características

### 🎨 **Diseño Moderno**
- UI glassmorphism con TailwindCSS
- Dark mode nativo
- Animaciones suaves y transiciones
- Diseño responsive (mobile-first)

### ⚡ **Performance**
- Server-Side Rendering (SSR) con Angular Universal
- TransferState para hidratación optimizada
- Lazy loading de rutas
- Caché inteligente en blog service

### 🔍 **SEO Optimizado**
- Meta tags dinámicos (title, description, keywords)
- Open Graph para redes sociales
- Twitter Cards
- Sitemap y robots.txt

### 📝 **Blog Técnico**
- Sistema de posts con markdown
- Fallback a mocks si API falla
- Caché en memoria y TransferState
- Rutas dinámicas por slug

### 📊 **Portfolio**
- Proyectos destacados con tecnologías
- Links a GitHub y case studies
- Categorización por tipo de proyecto

---

## 🏗️ Stack Técnico

**Frontend:**
- Angular 19 (Standalone Components)
- TypeScript 5.7
- TailwindCSS 3.4
- RxJS 7.8

**SSR:**
- Angular Universal (@angular/ssr)
- Express server
- TransferState API

**Tooling:**
- Angular CLI 19
- Prettier (formateo)
- Karma + Jasmine (testing)

---

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/Franncogonza/francog.dev.git
cd francog.dev

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Abrí tu navegador en `http://localhost:4200/`

### Scripts Disponibles

```bash
# Desarrollo
npm start              # Servidor de desarrollo (CSR)
npm run dev:ssr        # Servidor de desarrollo (SSR)

# Build
npm run build:ssr      # Build para producción con SSR

# Servidor SSR
npm run serve:ssr      # Servir build SSR localmente

# Testing
npm test               # Tests unitarios con Karma
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout/              # Componentes de layout
│   │   └── main-layout/     # Layout principal con header/footer
│   ├── pages/               # Páginas de la aplicación
│   │   ├── home/            # Página de inicio
│   │   ├── about/           # Sobre mí
│   │   ├── portfolio/       # Portfolio de proyectos
│   │   ├── blog/            # Lista de posts
│   │   ├── blog-detail/     # Detalle de post
│   │   └── contact/         # Formulario de contacto
│   ├── services/            # Servicios de la aplicación
│   │   ├── blog.service.ts  # Gestión de posts (caché + API)
│   │   ├── seo.service.ts   # Meta tags y SEO
│   │   └── logger.service.ts # Logging y error handling
│   └── tokens/              # Injection tokens
├── mocks/                   # Datos mock para desarrollo
├── environments/            # Configuración de entornos
└── styles.scss              # Estilos globales
```

---

## 🎯 Arquitectura

### **Standalone Components**
Todos los componentes usan la arquitectura standalone de Angular 19 (sin NgModules).

### **State Management**
- Signals para estado reactivo
- RxJS para operaciones asíncronas
- BehaviorSubject para streams de datos

### **SEO Service**
Servicio centralizado que gestiona:
- Títulos de página dinámicos
- Meta tags (description, keywords)
- Open Graph tags
- Twitter Cards

### **Blog Service**
Sistema de caché multi-nivel:
1. **TransferState** (SSR → Cliente)
2. **Caché en memoria** (runtime)
3. **HTTP con fallback** (API → mocks)

```typescript
// Ejemplo de uso
this.blogService.getAllWithCache().subscribe(posts => {
  // Posts desde caché o API
});
```

---

## 🔒 Type Safety

**Mejoras de TypeScript:**
- Uso de `unknown` en lugar de `any`
- Type guards para validación de errores
- Interfaces estrictas para datos

```typescript
// Type guard example
const hasStatus = (err: unknown): err is { status: number } => {
  return typeof err === 'object' && err !== null && 'status' in err;
};
```

---

## 🌐 Deploy

El sitio está deployado en **Vercel** con SSR habilitado.

**Variables de entorno:**
```bash
# .env.example
BLOG_API_URL=https://api.example.com/posts
```

---

## 📝 Blog Posts

Los posts del blog están en `src/mocks/blog.data.ts` como fallback. En producción, se pueden cargar desde una API externa.

**Estructura de un post:**
```typescript
interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  emoji?: string;
  date?: string;
  tags?: string[];
}
```

---

## 🎨 Personalización

### **Colores**
Los colores se definen en `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
    }
  }
}
```

### **SEO**
Configurá el SEO base en `src/app/services/seo.service.ts`:
```typescript
private baseUrl = 'https://francodavid.dev';
private siteName = 'Franco David';
```

---

## 🤝 Contribuciones

Este es un proyecto personal, pero si encontrás un bug o tenés una sugerencia, abrí un issue.

---

## 👤 Autor

**Franco David Gonzalez**

- GitHub: [@Franncogonza](https://github.com/Franncogonza)
- LinkedIn: [Franco David Gonzalez](https://linkedin.com/in/franco-david-gonzalez)
- Email: gonzalez.francodavid@hotmail.com

---

## 📜 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

**⭐ Si te resultó útil, dale una estrella al repo!**
