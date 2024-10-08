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

  login(user: any): Observable<HttpResponse<OkResponse>> {
    return this.http
      .post<OkResponse>(`${this.baseUrl}/jwt`, user, {
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

  logout() {
    localStorage.removeItem('accId');
    localStorage.removeItem('user-token');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user-token') ? true : false;
  }

  getToken() {
    return localStorage.getItem('user-token');
  }

  getPayload() {
    const token = this.getToken();
    if (token) {
      let payload = token.split('.')[1];
      let decodedPayload = window.atob(payload);
      let payloadObject = JSON.parse(decodedPayload);
      return payloadObject;
    }
  }

  extractSubject() {
    return this.getPayload().sub ;
  }

  isAdmin() {
    return this.getPayload()?.admin;
  }

  forbiddenAccess() {
    return this.router.navigate(['forbidden']);
  }
}
