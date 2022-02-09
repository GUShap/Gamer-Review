import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHeadersInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'acff1e5eaemshee67b0aab9b5725p18f6d9jsn17d4633c8ae5'
      },
      setParams: {
        key: 'c7e88311b8e94c1788d858a2d3e2094f'
      }
    });
    return next.handle(req)
  }
}
