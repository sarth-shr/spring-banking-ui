import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkResponse } from '../api/response/ok-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly baseUrl = "http://localhost:8080/api/v1/"

  constructor(private http: HttpClient) { }

  deposit(accId: number, amount: number): Observable<OkResponse>{
    let params = new HttpParams();
    params = params.append("accId", accId);
    params = params.append("amount", amount);
    return this.http.post<OkResponse>(`${this.baseUrl}/accounts/deposit`, {
      params: params
    })
  }
}
