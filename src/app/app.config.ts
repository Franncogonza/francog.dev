import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BLOG_API_URL } from './tokens/api.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(RouterModule),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: BLOG_API_URL,
      useValue: 'https://francog-backend.onrender.com/blog',
    },
  ],
};
