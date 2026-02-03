import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BLOG_API_URL } from './tokens/api.tokens';
import { EnvironmentValidator } from './core/environment-validator';
import { environment } from '../environments/environment';

/**
 * Validador de entorno que se ejecuta antes de iniciar la aplicación
 * Fail-fast: Si hay errores, la app no arranca
 */
function validateEnvironmentFactory() {
  return () => {
    EnvironmentValidator.validateOrThrow(environment);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(RouterModule),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: BLOG_API_URL,
      useValue: environment.apiUrl.blog,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: validateEnvironmentFactory,
      multi: true,
    },
  ],
};
