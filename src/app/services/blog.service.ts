import { Injectable, Inject, PLATFORM_ID, makeStateKey, TransferState } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import {
  Observable,
  of,
  BehaviorSubject,
  catchError,
  retry,
  timeout,
  tap,
  shareReplay,
} from 'rxjs';
import { BLOG_API_URL } from '../tokens/api.tokens';
import { BLOG_POSTS } from '../../mocks/blog.data';
import { LoggerService } from './logger.service';

export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  emoji?: string;
  date?: string;
  tags?: string[];
}

const BLOGS_KEY = makeStateKey<Blog[]>('blogs_data');

@Injectable({ providedIn: 'root' })
export class BlogService {
  private cache: Blog[] | null = null;
  private cachedRequest$: Observable<Blog[]> | null = null;
  // Timeout agresivo de 2s para mostrar mocks rápido si Render duerme
  private readonly TIMEOUT_MS = 2000;
  private readonly RETRY_ATTEMPTS = 0;
  // Stream público para consumo optimista desde el cliente
  private readonly postsSubject = new BehaviorSubject<Blog[]>(BLOG_POSTS);
  public readonly posts$ = this.postsSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService,
    private readonly transferState: TransferState,
    @Inject(BLOG_API_URL) private readonly apiUrl: string,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl).pipe(
      timeout(this.TIMEOUT_MS),
      retry({ count: this.RETRY_ATTEMPTS, delay: 500 }),
      catchError((error: HttpErrorResponse) => {
        this.logger.error('Error en API, usando Fallback', error, 'BlogService');
        return of(BLOG_POSTS);
      })
    );
  }
  getAllWithCache(): Observable<Blog[]> {
    // 1. TransferState (SSR -> Cliente)
    if (this.transferState.hasKey(BLOGS_KEY)) {
      const storedData = this.transferState.get(BLOGS_KEY, null);
      this.transferState.remove(BLOGS_KEY);
      this.cache = storedData;
      // Emite inmediatamente los datos de TransferState
      this.postsSubject.next(storedData!);
      return of(storedData!);
    }

    // 2. Caché en memoria
    if (this.cache) return of(this.cache);

    // 3. Build / SSR
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(BLOGS_KEY, BLOG_POSTS);
      // En servidor emitimos mocks para que el cliente los reciba via TransferState
      this.postsSubject.next(BLOG_POSTS);
      return of(BLOG_POSTS);
    }

    // 4. Request en progreso
    if (this.cachedRequest$) return this.cachedRequest$;

    // 5. Petición HTTP
    this.cachedRequest$ = this.getAll().pipe(
      tap((data: Blog[]) => {
        this.cache = data;
        // Actualiza el stream público cuando la API responde
        this.postsSubject.next(data);
      }),
      catchError(() => {
        this.cache = BLOG_POSTS;
        this.postsSubject.next(BLOG_POSTS);
        return of(BLOG_POSTS);
      }),
      tap({ finalize: () => (this.cachedRequest$ = null) }),
      shareReplay(1)
    );

    return this.cachedRequest$;
  }

  clearAll(): void {
    this.cache = null;
    this.cachedRequest$ = null;
    this.transferState.remove(BLOGS_KEY);
  }
}
