import { Injectable } from '@angular/core';

export interface LogError {
  message: string;
  context?: string;
  error?: unknown;
  timestamp?: Date;
}

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private isDevelopment = !this.isProd();

  // Mapa de mensajes de error por código HTTP
  private readonly errorMessages: Record<number, string> = {
    0: 'No hay conexión a internet. Verifica tu conexión.',
    408: 'La solicitud tardó demasiado. Intenta de nuevo.',
    429: 'Demasiadas solicitudes. Por favor, espera un momento.',
    504: 'La solicitud tardó demasiado. Intenta de nuevo.',
  };

  log(message: string, context?: string): void {
    console.log(`[${context || 'APP'}] ${message}`);
  }

  warn(message: string, context?: string): void {
    console.warn(`[${context || 'APP'}] ${message}`);
  }

  error(message: string, error?: unknown, context?: string): void {
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

  getSpecificErrorMessage(error: unknown): string {
    if (!error) return 'Ocurrió un error desconocido';

    // Type guard para verificar si error tiene propiedad status
    const hasStatus = (err: unknown): err is { status: number } => {
      return typeof err === 'object' && err !== null && 'status' in err;
    };

    // Type guard para verificar si error tiene propiedad message
    const hasMessage = (err: unknown): err is { message: string } => {
      return typeof err === 'object' && err !== null && 'message' in err;
    };

    // Buscar mensaje específico por código de error
    if (hasStatus(error)) {
      // Buscar en el mapa de errores
      const specificMessage = this.errorMessages[error.status];
      if (specificMessage) {
        return specificMessage;
      }

      // Mensajes genéricos por rango de código
      if (error.status >= 500) {
        return 'Error en el servidor. Intenta más tarde.';
      }
      if (error.status >= 400) {
        return 'Error en la solicitud. Verifica los datos.';
      }
    }

    // Fallback a mensaje del error si existe
    if (hasMessage(error)) {
      return error.message;
    }

    return 'Ocurrió un error. Por favor, intenta de nuevo.';
  }
}
