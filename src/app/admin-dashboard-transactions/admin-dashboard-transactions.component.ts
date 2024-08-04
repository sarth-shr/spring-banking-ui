import { Component, OnInit } from '@angular/core';
import { TransactionListResponse } from '../api/response/transaction-list-response';
import { TransactionService } from '../service/transaction.service';
import { ErrorResponse } from '../api/response/error-response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-admin-dashboard-transactions',
  standalone: true,
  imports: [MatPaginator, DatePipe],
  templateUrl: './admin-dashboard-transactions.component.html',
  styleUrl: './admin-dashboard-transactions.component.css'
})
export class AdminDashboardTransactionsComponent implements OnInit{
  sortedData!: Transaction[];
  transactions!: TransactionListResponse;
  
  currentPage = 0;
  pageSize!: number;
  totalItems!: number;

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.getTransactions(this.currentPage);
  }

  private getTransactions(currentPage: number){
    this.transactionService.getAll(currentPage).subscribe({
      next: (res: TransactionListResponse)=>{
        this.transactions = res;
        this.totalItems = res.data.totalItems;
        this.pageSize = res.data.pageSize;
      },
      error: (err: ErrorResponse) => {
        console.log(err.error);
      }
    })
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getTransactions(this.currentPage);
  }

}
