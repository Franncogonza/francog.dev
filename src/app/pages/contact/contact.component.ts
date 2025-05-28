import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
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

    const formData = new FormData();
    formData.append('name', this.name());
    formData.append('email', this.email());
    formData.append('message', this.message());

    try {
      const res = await fetch('https://formsubmit.co/ajax/gonzalez.francodavid77@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        this.formStatus.set('success');
        this.resetForm();
      } else {
        this.formStatus.set('error');
      }
    } catch {
      this.formStatus.set('error');
    } finally {
      setTimeout(() => this.formStatus.set('idle'), 5000);
    }
  }

  resetForm() {
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.touched.set({ name: false, email: false, message: false });
  }
}
