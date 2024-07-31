import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountListResponse } from '../api/response/account-list-response';
import { AccountResponse } from '../api/response/account-response';
import { OkResponse } from '../api/response/ok-response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly baseUrl = 'http://localhost:8080/api/v1/accounts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AccountListResponse> {
    return this.http.get<AccountListResponse>(`${this.baseUrl}`);
  }

  getAllByEmail(email: string): Observable<AccountListResponse> {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<AccountListResponse>(`${this.baseUrl}/get-by-email`, {
      params: params,
    });
  }

  get(accId: number): Observable<AccountResponse> {
    let params = new HttpParams();
    params = params.append('accId', accId);
    return this.http.get<AccountResponse>(`${this.baseUrl}/get-by-id`, {
      params: params,
    });
  }

  open(type: any, balance: any, email: any): Observable<OkResponse> {
    return this.http.post<OkResponse>(`${this.baseUrl}`, {
      type,
      balance,
      customer: { email },
    });
  }
}
