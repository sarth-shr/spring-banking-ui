import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../api/response/error-response';
import { OkResponse } from '../api/response/ok-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly baseUrl = 'http://localhost:8080/api/v1';

  private token!: string;

  constructor(private http: HttpClient) {}

  register(customer: any): Observable<OkResponse> {
    return this.http
      .post<OkResponse>(`${this.baseUrl}/customers`, customer)
      .pipe(catchError(this.handleError));
  }

  login(customer: any): Observable<HttpResponse<OkResponse>> {
    return this.http
      .post<OkResponse>(`${this.baseUrl}/jwt`, customer, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          this.token = res.headers.get('Authorization') as string;
          sessionStorage.setItem('user-token', this.token);
          return res;
        })
      )
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    sessionStorage.removeItem('user-token');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user-token') ? true : false;
  }

  extractSubject(): string {
    const token = sessionStorage.getItem('user-token') as string;
    let payload = token.split('.')[1];
    let decodedPayload = window.atob(payload);
    let payloadObject = JSON.parse(decodedPayload);
    return payloadObject.sub;
  }

  private handleError(error: HttpErrorResponse) {
    let httpError: ErrorResponse = error.error;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.code}, body was: `,
        httpError
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => httpError);
  }
}
