import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountResponse } from '../api/response/account-response';
import { ErrorResponse } from '../api/response/error-response';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-account-details',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  account!: AccountResponse;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    let id = sessionStorage.getItem('accId') as string;
    this.accountService.get(parseInt(id)).subscribe({
      next: (res: AccountResponse) => {
        this.account = res;
      },
      error: (err: ErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  goToDeposit(){
    this.router.navigate(["/transactions/deposit"])
  }
}
