import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerResponse } from '../api/response/customer-response';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';
import { ErrorResponse } from '../api/response/error-response';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent implements OnInit {
  customer!: CustomerResponse;

  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
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
}
