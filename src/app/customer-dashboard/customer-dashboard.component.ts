import { Component, OnInit } from '@angular/core';
import { CustomerResponse } from '../api/response/customer-response';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent implements OnInit {
  customer!: CustomerResponse;

  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.customerService
      .get(this.authService.extractSubject())
      .subscribe((res) => {
        this.customer = res;
      });
  }
}
