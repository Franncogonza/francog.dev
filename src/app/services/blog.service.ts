// src/app/services/blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  id: string;
  title: string;
  content: string;
  // ...ajustá según tu DTO o modelo
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private API_URL = 'https://francog-backend.onrender.com/blog';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.API_URL);
  }
}
