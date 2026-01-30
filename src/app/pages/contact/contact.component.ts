import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../services/logger.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  // Inputs
  name = signal('');
  email = signal('');
  message = signal('');

  // Estado de interacción (touched)
  touched = signal({
    name: false,
    email: false,
    message: false,
  });

  // Estado del formulario
  formStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  formError = signal<string | null>(null);

  constructor(
    private readonly logger: LoggerService,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.setContactPage();
  }

  // Validaciones
  nameError = computed(() => {
    if (!this.touched().name) return '';
    if (!this.name()) return 'El nombre es obligatorio.';
    if (this.name().length < 3) return 'Mínimo 3 caracteres.';
    return '';
  });

  emailError = computed(() => {
    if (!this.touched().email) return '';
    if (!this.email()) return 'El email es obligatorio.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(this.email())) return 'Email no válido.';
    return '';
  });

  messageError = computed(() => {
    if (!this.touched().message) return '';
    if (!this.message()) return 'El mensaje es obligatorio.';
    if (this.message().length < 10) return 'Mínimo 10 caracteres.';
    return '';
  });

  formValid = computed(() => {
    return !this.nameError() && !this.emailError() && !this.messageError();
  });

  // Handle cambios
  onInput(field: 'name' | 'email' | 'message', value: string) {
    if (field === 'name') this.name.set(value);
    if (field === 'email') this.email.set(value);
    if (field === 'message') this.message.set(value);

    this.touched.update(t => ({ ...t, [field]: true }));
  }

  // Submit
  async onSubmit() {
    this.touched.set({ name: true, email: true, message: true });

    if (!this.formValid()) return;

    this.formStatus.set('sending');
    this.formError.set(null);

    const formData = new FormData();
    formData.append('name', this.name());
    formData.append('email', this.email());
    formData.append('message', this.message());

    try {
      const contactUrl = `${environment.contact.formSubmitEndpoint}/${environment.contact.destinationEmail}`;
      const res = await fetch(contactUrl, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        this.formStatus.set('success');
        this.formError.set(null);
        this.logger.log('Formulario enviado exitosamente', 'ContactComponent');
        setTimeout(() => {
          this.resetForm();
          this.formStatus.set('idle');
        }, 2500);

        return;
      } else if (res.status === 429) {
        this.handleError('Demasiadas solicitudes. Intenta de nuevo en unos minutos.', res);
      } else if (res.status >= 500) {
        this.handleError('Error en el servidor. Intenta de nuevo más tarde.', res);
      } else {
        this.handleError('Error al enviar el formulario. Verifica los datos.', res);
      }
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        this.handleError('No hay conexión a internet. Verifica tu conexión.', error);
      } else {
        this.handleError('Error de red. Intenta de nuevo.', error);
      }
    } finally {
      setTimeout(() => {
        if (this.formStatus() === 'success') {
          this.formStatus.set('idle');
          this.formError.set(null);
        }
      }, 4000);
    }
  }

  private handleError(message: string, error: any): void {
    this.formStatus.set('error');
    this.formError.set(message);
    this.logger.error('Error al enviar formulario de contacto', error, 'ContactComponent');
  }

  resetForm() {
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.touched.set({ name: false, email: false, message: false });
  }
}
