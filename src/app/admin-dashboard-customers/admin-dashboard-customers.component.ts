import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerListResponse } from '../api/response/customer-list-response';
import { ErrorResponse } from '../api/response/error-response';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-admin-dashboard-customers',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './admin-dashboard-customers.component.html',
  styleUrl: './admin-dashboard-customers.component.css',
})
export class AdminDashboardCustomersComponent implements OnInit {
  customers!: CustomerListResponse;
  totalItems!: number;
  pageSize!: number;
  currentPage = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers(this.currentPage);
  }

  getCustomers(currentPage: number) {
    this.customerService.getAll(currentPage).subscribe({
      next: (res: CustomerListResponse) => {
        this.customers = res;
        this.totalItems = res.response.totalItems;
        this.pageSize = res.response.pageSize;
      },
    });
  }

  goToDetails() {}

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getCustomers(this.currentPage);
  }
}
