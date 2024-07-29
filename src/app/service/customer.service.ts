import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerListResponse } from '../api/response/customer-list-response';
import { CustomerResponse } from '../api/response/customer-response';
import { OkResponse } from '../api/response/ok-response';

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

  getAll(): Observable<CustomerListResponse> {
    return this.http.get<CustomerListResponse>(`${this.baseUrl}`);
  }

  updatePersonal(customer: any, email: string): Observable<OkResponse> {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.put<OkResponse>(
      `${this.baseUrl}/update/personal`,
      customer,
      { params: params }
    );
  }

  updateEmail(customer: any, email: string): Observable<OkResponse>{
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.put<OkResponse>(`${this.baseUrl}/update/email`, customer, {params: params});
  }

  updatePassword(currentPassword: any, password: any, email: string):Observable<OkResponse>{
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.put<OkResponse>(`${this.baseUrl}/update/password`, {currentPassword, password}, {params: params})
  }
}
