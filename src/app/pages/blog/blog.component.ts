import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Blog, BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);

  // Patrón reactivo moderno: Observable → Signal
  private postsSignal = toSignal(this.blogService.posts$, { initialValue: [] as Blog[] });
  
  // Signals para estados derivados
  posts = computed(() => this.postsSignal());
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    // Disparar carga en background (sin subscribe manual)
    this.blogService.getAllWithCache().subscribe({
      next: () => this.isLoading.set(false),
      error: () => {
        this.error.set('No se pudieron cargar los posts.');
        this.isLoading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.seo.setBlogPage();
    this.isLoading.set(true);
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.blogService.getAllWithCache().subscribe({
      next: () => this.isLoading.set(false),
      error: () => {
        this.error.set('No se pudieron cargar los posts.');
        this.isLoading.set(false);
      },
    });
  }
}
