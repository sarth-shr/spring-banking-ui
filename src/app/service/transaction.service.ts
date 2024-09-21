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

  getAll(page: number): Observable<TransactionListResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http.get<TransactionListResponse>(
      `${this.baseUrl}/transactions`,
      { params }
    );
  }

  getByAccNumber(fromAccNumber: string, page: number): Observable<TransactionListResponse> {
    let params = new HttpParams();
    params = params.append('accNumber', fromAccNumber);
    params = params.append('page', page);

    return this.http.get<TransactionListResponse>(
      `${this.baseUrl}/transactions/get`,
      { params }
    );
  }

  deposit(accNumber: string, amount: number): Observable<OkResponse> {
    return this.http.post<OkResponse>(`${this.baseUrl}/accounts/deposit`, {
      accNumber,
      amount,
    });
  }

  transfer(
    fromAccNumber: string,
    toAccNumber: string,
    amount: number
  ): Observable<OkResponse> {
    return this.http.post<OkResponse>(`${this.baseUrl}/accounts/transfer`, {
      fromAccNumber,
      toAccNumber,
      amount,
    });
  }
}
