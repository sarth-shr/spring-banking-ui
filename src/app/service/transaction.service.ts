import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkResponse } from '../api/response/ok-response';
import { TransactionListResponse } from '../api/response/transaction-list-response';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  deposit(accId: number, amount: number): Observable<OkResponse> {
    let params = new HttpParams();
    params = params.append('accId', accId);
    params = params.append('amount', amount);
    console.log(params);
    console.log(params.get('amount'));

    return this.http.post<OkResponse>(
      `${this.baseUrl}/accounts/deposit`,
      params
    );
  }

  transfer(
    fromId: number,
    toId: number,
    amount: number
  ): Observable<OkResponse> {
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    params = params.append('toId', toId);
    params = params.append('amount', amount);

    return this.http.post<OkResponse>(
      `${this.baseUrl}/accounts/transfer`,
      params
    );
  }

  getByAccId(accId: number, page: number): Observable<TransactionListResponse> {
    let params = new HttpParams();
    params = params.append('accId', accId);
    params = params.append('page', page);

    return this.http.get<TransactionListResponse>(
      `${this.baseUrl}/transactions/get`, {params}
    );
  }
}
