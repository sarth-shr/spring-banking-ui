import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from '../api/response/error-response';
import { OkResponse } from '../api/response/ok-response';
import { AccountService } from '../service/account.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-customer-account-open',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './account-open.component.html',
  styleUrl: './account-open.component.css',
})
export class AccountOpenComponent {
  form = new FormGroup({
    type: new FormControl('', [Validators.required]),
    balance: new FormControl('', [
      Validators.required,
      Validators.min(5000),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(
    private accountService: AccountService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    this.openAccount();
  }

  private openAccount() {
    this.accountService
      .open(
        this.type?.value,
        this.balance?.value,
        this.authService.extractSubject()
      )
      .subscribe({
        next: (res: OkResponse) => {
          alert(res.message);
          this.router.navigate(['/accounts']);
        },
      });
  }

  public get type() {
    return this.form.get('type');
  }

  public get balance() {
    return this.form.get('balance');
  }
}
