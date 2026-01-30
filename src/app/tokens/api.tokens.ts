import { InjectionToken } from '@angular/core';

export const BLOG_API_URL = new InjectionToken<string>('blog-api-url', {
  providedIn: 'root',
  factory: () => 'https://francog-backend.onrender.com/blog',
});
