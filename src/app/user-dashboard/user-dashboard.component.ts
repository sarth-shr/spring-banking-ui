import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountListResponse } from '../api/response/account-list-response';
import { CustomerListResponse } from '../api/response/customer-list-response';
import { CustomerResponse } from '../api/response/customer-response';
import { ErrorResponse } from '../api/response/error-response';
import { TransactionListResponse } from '../api/response/transaction-list-response';
import { AccountService } from '../service/account.service';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  customer!: CustomerResponse;
  customers!: CustomerListResponse;
  accounts!: AccountListResponse;
  transactions!: TransactionListResponse;
  currentPage = 0;

  isAdmin!: boolean;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.getCustomers();
      this.getAccounts();
      this.getTransactions();
    }
    this.getCustomer();
  }

  private getCustomer() {
    this.customerService.get(this.authService.extractSubject()).subscribe({
      next: (res: CustomerResponse) => {
        this.customer = res;
      },
      error: (err: ErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  private getCustomers() {
    this.customerService.getAll(this.currentPage).subscribe((res) => {
      this.customers = res;
    });
  }

  private getAccounts() {
    this.accountService.getAll(this.currentPage).subscribe((res) => {
      this.accounts = res;
    });
  }

  private getTransactions() {
    this.transactionService.getAll(this.currentPage).subscribe((res) => {
      this.transactions = res;
    });
  }
}
