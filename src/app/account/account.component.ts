import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountListResponse } from '../api/response/account-list-response';
import { ErrorResponse } from '../api/response/error-response';
import { AccountService } from '../service/account.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  accounts!: AccountListResponse;
  accId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  private getAccounts() {
    this.accountService
      .getAllByEmail(this.authService.extractSubject())
      .subscribe({
        next: (res: AccountListResponse) => {
          this.accounts = res;
        },
        error: (err: ErrorResponse) => {
          console.log(err);
        },
      });
  }

  goToDetails(id: number) {
    sessionStorage.setItem('accId', id.toString());
    this.router.navigate(['details'], {
      relativeTo: this.route,
    });
  }
}
