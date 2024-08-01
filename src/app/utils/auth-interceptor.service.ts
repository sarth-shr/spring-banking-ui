import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      let token = localStorage.getItem('user-token');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(this.authService.isAdmin()){
        this.router.navigate(['/admin'])
      }
    }
    return next.handle(req);
  }
}
