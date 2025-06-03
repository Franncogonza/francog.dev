import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BLOG_POSTS } from '../../../mocks/blog.data';
import { RouterModule } from '@angular/router';
import { Blog, BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [BlogService],
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  posts = BLOG_POSTS;
  blogs: Blog[] = [];

  constructor(private readonly blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getAll().subscribe({
      next: data => (this.blogs = data),
      complete: () => console.log('Blogs cargados exitosamente', this.blogs),
      error: err => console.error('Error al traer blogs:', err),
    });
  }
}
