import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoggerService } from './logger.service';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly TIMEOUT_MS = 10000; // 10 segundos
  private readonly contactUrl = `${environment.contact.formSubmitEndpoint}/${environment.contact.destinationEmail}`;

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService
  ) {}

  submitContactForm(data: ContactFormData): Observable<ContactResponse> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);

    return this.http
      .post<ContactResponse>(this.contactUrl, formData, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        timeout(this.TIMEOUT_MS),
        catchError((error: HttpErrorResponse) => {
          this.logger.error('Error al enviar formulario de contacto', error, 'ContactService');
          return throwError(() => error);
        })
      );
  }

  getErrorMessage(error: unknown): string {
    if (!error) return 'Error desconocido. Intenta de nuevo.';

    // Type guard para HttpErrorResponse
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'No hay conexión a internet. Verifica tu conexión.';
      }
      if (error.status === 429) {
        return 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.';
      }
      if (error.status >= 500) {
        return 'Error en el servidor. Intenta de nuevo más tarde.';
      }
      if (error.status >= 400) {
        return 'Error al enviar el formulario. Verifica los datos.';
      }
    }

    // Type guard para TypeError (network errors)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return 'No hay conexión a internet. Verifica tu conexión.';
    }

    // Type guard para error con mensaje
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const err = error as { message: string };
      return err.message || 'Error de red. Intenta de nuevo.';
    }

    return 'Error al enviar el formulario. Intenta de nuevo.';
  }
}
