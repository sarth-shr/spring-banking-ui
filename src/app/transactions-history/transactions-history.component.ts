import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TransactionListResponse } from '../api/response/transaction-list-response';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-transactions-history',
  standalone: true,
  imports: [DatePipe, MatPaginator],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.css',
})
export class TransactionsHistoryComponent implements OnInit {
  transactions!: TransactionListResponse;

  totalItems!: number;
  pageSize!: number;
  currentPage = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getTransactions(this.currentPage);
  }

  private getTransactions(currentPage: number) {
    let accNumber = localStorage.getItem('accNumber') as string;
    this.transactionService.getByAccNumber(accNumber, currentPage).subscribe({
      next: (res) => {
        this.transactions = res;
        this.totalItems = res.response.totalItems;
        this.pageSize = res.response.pageSize;
      },
    });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getTransactions(this.currentPage);
  }
}
