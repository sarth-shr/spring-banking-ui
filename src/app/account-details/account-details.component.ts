import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountResponse } from '../api/response/account-response';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-customer-account-details',
  standalone: true,
  imports: [UpperCasePipe, PageNotFoundComponent],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  account!: AccountResponse;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let accNumber = localStorage.getItem("accNumber") as string;
    this.accountService.get(accNumber).subscribe({
      next: (res: AccountResponse) => {
        this.account = res;
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
