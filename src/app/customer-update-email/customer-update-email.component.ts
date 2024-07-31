import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerResponse } from '../api/response/customer-response';
import { ErrorResponse } from '../api/response/error-response';
import { OkResponse } from '../api/response/ok-response';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-update-email',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './customer-update-email.component.html',
  styleUrl: './customer-update-email.component.css',
})
export class CustomerUpdateEmailComponent implements OnInit {
  isSumitted = false;
  customer!: CustomerResponse;
  form = new FormGroup({
    updatedEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  });

  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  onSubmit() {
    this.update();
    this.isSumitted = true;
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

  private update() {
    this.customerService
      .updateEmail(this.form.value, this.authService.extractSubject())
      .subscribe({
        next: (res: OkResponse) => {
          alert(res.message+"\nYou will now be logged out");
          this.authService.logout();
        },
        error: (err: ErrorResponse) => {
          alert(err.error+"\nTry Again!");
        },
      });
  }

  public get updatedEmail() {
    return this.form.get('updatedEmail');
  }
}
