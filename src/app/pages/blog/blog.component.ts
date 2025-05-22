import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BLOG_POSTS } from '../../../mocks/blog.data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  posts = BLOG_POSTS;
}
