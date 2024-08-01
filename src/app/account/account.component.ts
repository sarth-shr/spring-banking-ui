import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountListResponse } from '../api/response/account-list-response';
import { ErrorResponse } from '../api/response/error-response';
import { AccountService } from '../service/account.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, MatPaginator],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  accounts!: AccountListResponse;
  totalItems!: number;
  pageSize!: number;
  currentPage = 0;

  accId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAccounts(this.currentPage);
  }

  private getAccounts(currentPage: number) {
    this.accountService
      .getAllByEmail(this.authService.extractSubject(), currentPage)
      .subscribe({
        next: (res: AccountListResponse) => {
          this.accounts = res;
          this.totalItems = res.data.pageable.totalElements;
          this.pageSize = res.data.pageable.pageSize;
        },
        error: (err: ErrorResponse) => {
          console.log(err);
        },
      });
  }

  goToDetails(id: number) {
    localStorage.setItem('accId', id.toString());
    this.router.navigate(['details'], {
      relativeTo: this.route,
    });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getAccounts(this.currentPage);
  }
}
