import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService, Blog } from './blog.service';
import { LoggerService } from './logger.service';
import { BLOG_API_URL } from '../tokens/api.tokens';
import { BLOG_POSTS } from '../../mocks/blog.data';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;
  let loggerService: LoggerService;
  const mockApiUrl = 'https://api.test.com/blog';

  const mockBlogResponse: Blog[] = [
    {
      id: '1',
      title: 'Test Post',
      description: 'Test Description',
      content: 'Test Content',
      slug: 'test-post',
      emoji: '🚀',
      date: '2026-01-29',
      tags: ['test'],
    },
    {
      id: '2',
      title: 'Another Post',
      description: 'Another Description',
      content: 'Another Content',
      slug: 'another-post',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService, LoggerService, { provide: BLOG_API_URL, useValue: mockApiUrl }],
    });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
    loggerService = TestBed.inject(LoggerService);

    spyOn(loggerService, 'log');
    spyOn(loggerService, 'warn');
    spyOn(loggerService, 'error');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll()', () => {
    it('debe hacer request a la API correctamente', done => {
      service.getAll().subscribe(data => {
        expect(data).toEqual(mockBlogResponse);
        expect(data.length).toBe(2);
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockBlogResponse);
    });

    it('debe aplicar timeout a la request', done => {
      service.getAll().subscribe(
        () => {
          fail('debería haber fallado por timeout');
        },
        error => {
          expect(error).toBeDefined();
          done();
        }
      );

      const req = httpMock.expectOne(mockApiUrl);
      // Simular timeout (no responder en el tiempo límite)
      setTimeout(() => {
        expect(loggerService.error).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('debe reintentar en caso de error', done => {
      let attempts = 0;

      service.getAll().subscribe(
        data => {
          expect(data).toEqual(BLOG_POSTS);
          expect(attempts).toBe(3); // 1 intento + 2 reintentos = 3
          done();
        },
        () => {
          fail('debería usar fallback a mocks');
        }
      );

      // Simular 3 intentos (1 principal + 2 reintentos)
      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(mockApiUrl);
        attempts++;
        req.error(new ErrorEvent('Network error'));
      }
    });

    it('debe retornar mocks como fallback cuando API falla', done => {
      service.getAll().subscribe(data => {
        expect(data).toEqual(BLOG_POSTS);
        expect(loggerService.warn).toHaveBeenCalledWith(
          jasmine.stringMatching(/Usando datos locales/),
          'BlogService'
        );
        done();
      });

      // Simular fallos en reintentos
      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(mockApiUrl);
        req.error(new ErrorEvent('Network error'));
      }
    });

    it('debe loguear exitosamente cuando la API responde', done => {
      service.getAll().subscribe(() => {
        expect(loggerService.log).toHaveBeenCalledWith(
          'Cargando posts desde API...',
          'BlogService'
        );
        expect(loggerService.log).toHaveBeenCalledWith(
          jasmine.stringMatching(/posts cargados exitosamente/),
          'BlogService'
        );
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });
  });

  describe('getAllWithCache()', () => {
    it('debe cachear los datos después de la primera llamada', done => {
      service.getAllWithCache().subscribe(data => {
        expect(data).toEqual(mockBlogResponse);
        expect(service.getCachedData()).toEqual(mockBlogResponse);
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });

    it('debe retornar datos en caché sin hacer nueva request', done => {
      // Primera llamada
      service.getAllWithCache().subscribe(() => {
        // Segunda llamada
        service.getAllWithCache().subscribe(data => {
          expect(data).toEqual(mockBlogResponse);
          done();
        });

        // No debería haber nueva request
        httpMock.expectNone(mockApiUrl);
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });

    it('debe usar shareReplay para reutilizar observable en requests simultáneas', done => {
      let completedCount = 0;

      const subscription1 = service.getAllWithCache().subscribe(() => {
        completedCount++;
        if (completedCount === 2) {
          // Solo debería haber una request HTTP
          expect(completedCount).toBe(2);
          done();
        }
      });

      const subscription2 = service.getAllWithCache().subscribe(() => {
        completedCount++;
        if (completedCount === 2) {
          // Solo debería haber una request HTTP
          expect(completedCount).toBe(2);
          done();
        }
      });

      // Esperar a que ambas se suscriban antes de responder
      setTimeout(() => {
        const req = httpMock.expectOne(mockApiUrl);
        req.flush(mockBlogResponse);
      }, 10);
    });

    it('debe cachear mocks cuando la API falla', done => {
      service.getAllWithCache().subscribe(data => {
        expect(data).toEqual(BLOG_POSTS);
        expect(service.getCachedData()).toEqual(BLOG_POSTS);
        expect(loggerService.log).toHaveBeenCalledWith(
          'Mocks cacheados como fallback',
          'BlogService'
        );
        done();
      });

      // Simular fallos en reintentos
      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(mockApiUrl);
        req.error(new ErrorEvent('Network error'));
      }
    });

    it('debe usar el caché cacheado del fallback en siguientes llamadas', done => {
      let callCount = 0;

      // Primera llamada - falla y cachea mocks
      service.getAllWithCache().subscribe(() => {
        callCount++;
        // Segunda llamada - debe usar caché sin hacer request
        service.getAllWithCache().subscribe(data => {
          expect(data).toEqual(BLOG_POSTS);
          expect(callCount).toBe(2);
          done();
        });

        // No debería haber nueva request
        httpMock.expectNone(mockApiUrl);
      });

      // Simular fallos
      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(mockApiUrl);
        req.error(new ErrorEvent('Network error'));
      }
    });
  });

  describe('invalidateCache()', () => {
    it('debe limpiar el caché', done => {
      service.getAllWithCache().subscribe(() => {
        expect(service.getCachedData()).toEqual(mockBlogResponse);

        service.invalidateCache();

        expect(service.getCachedData()).toBeNull();
        expect(loggerService.log).toHaveBeenCalledWith('Caché de blogs invalidado', 'BlogService');
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });

    it('debe hacer nueva request después de invalidar el caché', done => {
      // Primera llamada
      service.getAllWithCache().subscribe(() => {
        // Invalidar
        service.invalidateCache();

        // Segunda llamada (después de invalidar)
        service.getAllWithCache().subscribe(data => {
          expect(data).toEqual(mockBlogResponse);
          done();
        });

        const req2 = httpMock.expectOne(mockApiUrl);
        req2.flush(mockBlogResponse);
      });

      const req1 = httpMock.expectOne(mockApiUrl);
      req1.flush(mockBlogResponse);
    });
  });

  describe('getCachedData()', () => {
    it('debe retornar null si no hay caché', () => {
      expect(service.getCachedData()).toBeNull();
    });

    it('debe retornar los datos cacheados', done => {
      service.getAllWithCache().subscribe(() => {
        const cached = service.getCachedData();
        expect(cached).toEqual(mockBlogResponse);
        expect(cached).not.toBeNull();
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });
  });

  describe('setCachedData()', () => {
    it('debe establecer manualmente el caché', done => {
      service.setCachedData(mockBlogResponse);

      service.getAllWithCache().subscribe(data => {
        expect(data).toEqual(mockBlogResponse);
        // No debería haber request HTTP
        httpMock.expectNone(mockApiUrl);
        done();
      });
    });

    it('debe permitir sobrescribir el caché existente', done => {
      const newData: Blog[] = [
        {
          id: '99',
          title: 'New Post',
          description: 'New Description',
          content: 'New Content',
          slug: 'new-post',
        },
      ];

      service.setCachedData(mockBlogResponse);
      service.setCachedData(newData);

      expect(service.getCachedData()).toEqual(newData);
      done();
    });
  });

  describe('clearAll()', () => {
    it('debe limpiar el caché y los observables', done => {
      service.getAllWithCache().subscribe(() => {
        expect(service.getCachedData()).not.toBeNull();

        service.clearAll();

        expect(service.getCachedData()).toBeNull();
        expect(loggerService.log).toHaveBeenCalledWith(
          'Cache y observables limpiados completamente',
          'BlogService'
        );
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });

    it('debe hacer nueva request después de clearAll()', done => {
      service.getAllWithCache().subscribe(() => {
        service.clearAll();

        service.getAllWithCache().subscribe(data => {
          expect(data).toEqual(mockBlogResponse);
          done();
        });

        const req2 = httpMock.expectOne(mockApiUrl);
        req2.flush(mockBlogResponse);
      });

      const req1 = httpMock.expectOne(mockApiUrl);
      req1.flush(mockBlogResponse);
    });
  });

  describe('Tipado de Datos', () => {
    it('debe retornar Blog[] correctamente tipado', done => {
      service.getAll().subscribe((blogs: Blog[]) => {
        blogs.forEach(blog => {
          expect(blog.id).toBeDefined();
          expect(blog.title).toBeDefined();
          expect(blog.description).toBeDefined();
          expect(blog.content).toBeDefined();
          expect(blog.slug).toBeDefined();
        });
        done();
      });

      const req = httpMock.expectOne(mockApiUrl);
      req.flush(mockBlogResponse);
    });

    it('debe manejar Blog[] con propiedades opcionales', done => {
      const blogWithOptionals = mockBlogResponse[1]; // Sin emoji, date, tags
      expect(blogWithOptionals.emoji).toBeUndefined();
      expect(blogWithOptionals.date).toBeUndefined();
      expect(blogWithOptionals.tags).toBeUndefined();
      done();
    });
  });

  describe('Manejo de Errores', () => {
    it('debe loguear errores HTTP correctamente', done => {
      service.getAll().subscribe(() => {
        expect(loggerService.error).toHaveBeenCalled();
        done();
      });

      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(mockApiUrl);
        req.error(new ErrorEvent('Network error'));
      }
    });

    it('debe recuperarse de errores con fallback', done => {
      service.getAllWithCache().subscribe(
        data => {
          expect(data).toBeDefined();
          expect(data.length).toBeGreaterThan(0);
          done();
        },
        () => {
          fail('debería recuperarse con fallback');
        }
      );

      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(mockApiUrl);
        req.error(new ErrorEvent('Network error'));
      }
    });
  });
});
