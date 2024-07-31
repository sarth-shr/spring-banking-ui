import { Component, OnInit } from '@angular/core';
import { ErrorResponse } from '../api/response/error-response';
import { TransactionListResponse } from '../api/response/transaction-list-response';
import { TransactionService } from '../service/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.css',
})
export class TransactionsHistoryComponent implements OnInit{
  transactions!: TransactionListResponse;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions() {
    let accId = sessionStorage.getItem('accId') as string;
    this.transactionService.getByAccId(parseInt(accId)).subscribe({
      next: (res) => {
        this.transactions = res;
        console.log(res);
      },
      error: (err: ErrorResponse) => {
        console.log(err);
      },
    });
  }
}
