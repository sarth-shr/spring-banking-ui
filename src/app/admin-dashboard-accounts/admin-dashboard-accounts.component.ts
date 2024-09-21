import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AccountListResponse } from '../api/response/account-list-response';
import { ErrorResponse } from '../api/response/error-response';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-admin-dashboard-accounts',
  standalone: true,
  imports: [MatPaginator, UpperCasePipe, MatSortModule],
  templateUrl: './admin-dashboard-accounts.component.html',
  styleUrl: './admin-dashboard-accounts.component.css',
})
export class AdminDashboardAccountsComponent implements OnInit {
  accounts!: AccountListResponse;
  sortedData!: Account[];

  currentPage = 0;
  pageSize!: number;
  totalItems!: number;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getAccounts(this.currentPage);
  }

  private getAccounts(currentPage: number) {
    this.accountService.getAll(currentPage).subscribe({
      next: (res: AccountListResponse) => {
        this.accounts = res;
        this.sortedData = this.accounts.response.content;
        this.totalItems = res.response.totalItems;
        this.pageSize = res.response.pageSize;
      },
    });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getAccounts(this.currentPage);
  }

  sortData(sort: Sort) {
    const data = this.accounts.response.content;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.accountNumber, b.accountNumber, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'balance':
          return this.compare(a.balance, b.balance, isAsc);
        case 'interest':
          return this.compare(a.interest, b.interest, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  goToDetails() {}
}
