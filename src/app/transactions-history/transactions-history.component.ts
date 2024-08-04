import { Component, OnInit } from '@angular/core';
import { ErrorResponse } from '../api/response/error-response';
import { TransactionListResponse } from '../api/response/transaction-list-response';
import { TransactionService } from '../service/transaction.service';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions-history',
  standalone: true,
  imports: [DatePipe, MatPaginator],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.css',
})
export class TransactionsHistoryComponent implements OnInit{
  transactions!: TransactionListResponse;
  accId!: number | string;

  totalItems!: number;
  pageSize!: number;
  currentPage = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getTransactions(this.currentPage);
  }

  private getTransactions(currentPage: number) {
    this.accId = localStorage.getItem('accId') as string;
    this.transactionService.getByAccId(parseInt(this.accId), currentPage).subscribe({
      next: (res) => {
        this.transactions = res;
        this.totalItems = res.data.totalItems;
        this.pageSize = res.data.totalItems;
        console.log(res);
      },
      error: (err: ErrorResponse) => {
        console.log(err);
        console.log(this.transactions);
        
      },
    });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getTransactions(this.currentPage);
  }

}
