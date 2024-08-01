import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OkResponse } from '../api/response/ok-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly baseUrl = 'http://localhost:8080/api/v1';

  private token!: string;

  constructor(private http: HttpClient, private router: Router) {}

  register(customer: any): Observable<OkResponse> {
    return this.http.post<OkResponse>(`${this.baseUrl}/customers`, customer);
  }

  login(customer: any): Observable<HttpResponse<OkResponse>> {
    return this.http
      .post<OkResponse>(`${this.baseUrl}/jwt`, customer, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          this.token = res.headers.get('Authorization') as string;
          localStorage.setItem('user-token', this.token);
          return res;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user-token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user-token') ? true : false;
  }

  extractSubject(): string {
    const token = localStorage.getItem('user-token') as string;
    let payload = token.split('.')[1];
    let decodedPayload = window.atob(payload);
    let payloadObject = JSON.parse(decodedPayload);
    return payloadObject.sub;
  }
}
