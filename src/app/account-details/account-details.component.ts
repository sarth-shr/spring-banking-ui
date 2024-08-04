import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountResponse } from '../api/response/account-response';
import { ErrorResponse } from '../api/response/error-response';
import { AccountService } from '../service/account.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Component({
  selector: 'app-customer-account-details',
  standalone: true,
  imports: [UpperCasePipe, PageNotFoundComponent],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  account!: AccountResponse;
  id!: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });
    this.accountService.get(parseInt(this.id)).subscribe({
      next: (res: AccountResponse) => {
        this.account = res;
      },
      error: (err: ErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  goToDeposit() {
    this.router.navigate(['/transactions/deposit']);
  }

  goToTransfer() {
    this.router.navigate(['/transactions/transfer']);
  }

  goToTransactions() {
    this.router.navigate(['/transactions']);
  }
}
