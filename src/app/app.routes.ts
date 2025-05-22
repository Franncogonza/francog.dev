import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'blog', component: BlogComponent },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('./pages/blog-detail/blog-detail.component').then(c => c.BlogDetailComponent),
      },

      { path: 'contact', component: ContactComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
