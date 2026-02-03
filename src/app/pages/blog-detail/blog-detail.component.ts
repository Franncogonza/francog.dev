import { Component, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BLOG_POSTS } from '../../../mocks/blog.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent {
  route = inject(ActivatedRoute);
  seo = inject(SeoService);

  slug = this.route.snapshot.paramMap.get('slug');

  post = computed(() => BLOG_POSTS.find(p => p.slug === this.slug));

  constructor() {
    // Actualizar SEO con JSON-LD cuando cambia el post
    effect(() => {
      const currentPost = this.post();
      if (currentPost) {
        this.seo.setBlogPostWithSchema(
          currentPost.title,
          currentPost.description,
          currentPost.slug,
          currentPost.date,
          undefined // imagen opcional
        );
      }
    });
  }
}
