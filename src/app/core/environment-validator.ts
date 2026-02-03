/**
 * Environment Validator - Fail Fast Pattern
 * 
 * Valida que las variables de entorno sean correctas al iniciar la aplicación.
 * Si hay errores, la app no arranca y muestra un error claro en consola.
 * 
 * Esto previene que la app arranque con configuración rota.
 */

export interface EnvironmentValidationError {
  field: string;
  value: string;
  reason: string;
}

export class EnvironmentValidator {
  private static readonly URL_PLACEHOLDER_REGEX = /\$\{[^}]+\}/;
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly URL_REGEX = /^https?:\/\/.+/;

  /**
   * Valida que una URL sea válida y no contenga placeholders sin reemplazar
   */
  static validateUrl(url: string, fieldName: string): EnvironmentValidationError | null {
    // Verificar si contiene placeholder sin reemplazar
    if (this.URL_PLACEHOLDER_REGEX.test(url)) {
      return {
        field: fieldName,
        value: url,
        reason: `Contiene placeholder sin reemplazar. Verifica tu pipeline de CI/CD.`,
      };
    }

    // Verificar que sea una URL válida
    if (!this.URL_REGEX.test(url)) {
      return {
        field: fieldName,
        value: url,
        reason: `No es una URL válida. Debe empezar con http:// o https://`,
      };
    }

    // Verificar que no sea una URL vacía o solo espacios
    if (url.trim().length === 0) {
      return {
        field: fieldName,
        value: url,
        reason: `URL vacía`,
      };
    }

    return null;
  }

  /**
   * Valida que un email sea válido y no contenga placeholders sin reemplazar
   */
  static validateEmail(email: string, fieldName: string): EnvironmentValidationError | null {
    // Verificar si contiene placeholder sin reemplazar
    if (this.URL_PLACEHOLDER_REGEX.test(email)) {
      return {
        field: fieldName,
        value: email,
        reason: `Contiene placeholder sin reemplazar. Verifica tu pipeline de CI/CD.`,
      };
    }

    // Verificar que sea un email válido
    if (!this.EMAIL_REGEX.test(email)) {
      return {
        field: fieldName,
        value: email,
        reason: `No es un email válido`,
      };
    }

    return null;
  }

  /**
   * Valida todo el objeto environment
   */
  static validateEnvironment(env: any): EnvironmentValidationError[] {
    const errors: EnvironmentValidationError[] = [];

    // Validar URLs de API
    if (env.apiUrl?.blog) {
      const error = this.validateUrl(env.apiUrl.blog, 'apiUrl.blog');
      if (error) errors.push(error);
    }

    // Validar contact form endpoint
    if (env.contact?.formSubmitEndpoint) {
      const error = this.validateUrl(env.contact.formSubmitEndpoint, 'contact.formSubmitEndpoint');
      if (error) errors.push(error);
    }

    // Validar destination email
    if (env.contact?.destinationEmail) {
      const error = this.validateEmail(env.contact.destinationEmail, 'contact.destinationEmail');
      if (error) errors.push(error);
    }

    return errors;
  }

  /**
   * Lanza un error bloqueante si hay problemas de configuración
   */
  static validateOrThrow(env: any): void {
    const errors = this.validateEnvironment(env);

    if (errors.length > 0) {
      const errorMessages = errors.map(
        err => `  ❌ ${err.field}: "${err.value}"\n     Razón: ${err.reason}`
      );

      const fullMessage = `
╔════════════════════════════════════════════════════════════════╗
║  🚨 ERROR CRÍTICO: CONFIGURACIÓN DE ENTORNO INVÁLIDA 🚨       ║
╚════════════════════════════════════════════════════════════════╝

La aplicación NO puede arrancar porque hay errores en las variables
de entorno. Esto previene que la app funcione con configuración rota.

Errores encontrados (${errors.length}):

${errorMessages.join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 Soluciones:

1. Si estás en desarrollo local:
   - Verifica src/environments/environment.ts

2. Si estás en CI/CD:
   - Verifica que las variables de entorno estén configuradas
   - Verifica que el script de reemplazo funcione correctamente
   - Variables esperadas: BLOG_API_URL, CONTACT_EMAIL

3. Si estás en producción:
   - Verifica las variables de entorno en tu plataforma de deploy
   - Ejemplo Vercel: Settings → Environment Variables
   - Ejemplo Netlify: Site settings → Build & deploy → Environment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  La app NO arrancará hasta que se corrijan estos errores.
    Esto es intencional: "Es mejor que no arranque a que arranque rota".

`;

      console.error(fullMessage);
      throw new Error('Environment validation failed. Check console for details.');
    }

    console.log('✅ Environment validation passed');
  }
}
