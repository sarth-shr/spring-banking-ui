import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionListResponse } from '../api/response/transaction-list-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly baseUrl = "http://localhost:8080/api/v1/transaction"

  constructor(private http: HttpClient) { }

  get(accId: number): Observable<TransactionListResponse>{
    return this.http.get<TransactionListResponse>(`${this.baseUrl}/${accId}`);
  }

}
