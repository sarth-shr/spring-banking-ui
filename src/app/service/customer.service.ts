import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../api/response/customer-response';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) {}

  get(email: string): Observable<CustomerResponse> {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<CustomerResponse>(`${this.baseUrl}/get`, {
      params: params,
    });
  }
}
