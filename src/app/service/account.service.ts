import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountResponse } from '../api/response/account-response';
import { OkResponse } from '../api/response/ok-response';
import { AccountListResponse } from '../api/response/account-list-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly baseUrl= "http://localhost:8080/api/v1/accounts"

  constructor(private http: HttpClient) { }

  getAll(): Observable<AccountListResponse>{
    return this.http.get<AccountListResponse>(`${this.baseUrl}`)
  }

  get(accId: number): Observable<AccountResponse>{
    return this.http.get<AccountResponse>(`${this.baseUrl}/${accId}`);
  }

  open(acc: any): Observable<OkResponse>{
    return this.http.post<OkResponse>(`${this.baseUrl}`, acc);
  }
}
