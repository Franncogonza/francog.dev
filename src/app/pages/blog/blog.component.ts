import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Blog, BlogService } from '../../services/blog.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit, OnDestroy {
  posts: Blog[] = [];
  isLoading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly blogService: BlogService,
    private readonly seo: SeoService,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit(): void {
    this.seo.setBlogPage();
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts(): void {
    this.isLoading = true;

    // Suscribirse al stream público para recibir inmediatamente los mocks
    this.blogService.posts$.pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.posts = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los posts.';
        this.isLoading = false;
      },
    });

    // Disparar la petición (o usar caché) en segundo plano
    this.blogService
      .getAllWithCache()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {},
        error: () => {},
      });
  }
}
