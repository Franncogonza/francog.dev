import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BLOG_POSTS } from '../../../mocks/blog.data';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent {
  route = inject(ActivatedRoute);

  slug = this.route.snapshot.paramMap.get('slug');

  post = computed(() => BLOG_POSTS.find(p => p.slug === this.slug));
}
