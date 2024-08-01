import { Component, OnInit } from '@angular/core';
import { AccountListResponse } from '../api/response/account-list-response';
import { ErrorResponse } from '../api/response/error-response';
import { AccountService } from '../service/account.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-accounts',
  standalone: true,
  imports: [MatPaginator, UpperCasePipe],
  templateUrl: './admin-dashboard-accounts.component.html',
  styleUrl: './admin-dashboard-accounts.component.css',
})
export class AdminDashboardAccountsComponent implements OnInit {
  accounts!: AccountListResponse;
  totalItems!: number;
  pageSize!: number;
  currentPage = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getAccounts(this.currentPage);
  }
  
  private getAccounts(currentPage: number) {
    this.accountService.getAll(currentPage).subscribe({
      next: (res: AccountListResponse) => {
        this.accounts = res;
        this.totalItems = res.data.pageable.totalElements;
        this.pageSize = res.data.pageable.pageSize;
      },
      error: (err: ErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  goToDetails(){}

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getAccounts(this.currentPage);
  }
}
