import { Injectable } from '@angular/core';

export interface LogError {
  message: string;
  context?: string;
  error?: any;
  timestamp?: Date;
}

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private isDevelopment = !this.isProd();

  log(message: string, context?: string): void {
    console.log(`[${context || 'APP'}] ${message}`);
  }

  warn(message: string, context?: string): void {
    console.warn(`[${context || 'APP'}] ${message}`);
  }

  error(message: string, error?: any, context?: string): void {
    const errorData: LogError = {
      message,
      context: context || 'APP',
      error,
      timestamp: new Date(),
    };

    console.error(errorData);

    // En producción, enviar a servicio de logging (Sentry, LogRocket, etc)
    if (!this.isDevelopment) {
      this.reportToRemote(errorData);
    }
  }

  private isProd(): boolean {
    // Detecta si está en producción
    return typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  }

  private reportToRemote(errorData: LogError): void {
    // Aquí se integraría Sentry, LogRocket, u otro servicio
    // Ejemplo para Sentry:
    // Sentry.captureException(errorData.error, { extra: errorData });

    // Por ahora, enviar a un endpoint de logging
    try {
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData),
      }).catch(() => {
        // Silenciar errores de reportes
      });
    } catch {
      // Fallback silencioso
    }
  }

  getSpecificErrorMessage(error: any): string {
    if (!error) return 'Ocurrió un error desconocido';

    // Mensajes específicos según tipo de error
    if (error.status === 0) {
      return 'No hay conexión a internet. Verifica tu conexión.';
    }
    if (error.status === 408 || error.status === 504) {
      return 'La solicitud tardó demasiado. Intenta de nuevo.';
    }
    if (error.status === 429) {
      return 'Demasiadas solicitudes. Por favor, espera un momento.';
    }
    if (error.status >= 500) {
      return 'Error en el servidor. Intenta más tarde.';
    }
    if (error.status >= 400) {
      return 'Error en la solicitud. Verifica los datos.';
    }
    if (error.message) {
      return error.message;
    }

    return 'Ocurrió un error. Por favor, intenta de nuevo.';
  }
}
