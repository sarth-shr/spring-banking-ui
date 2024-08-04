import { Component, OnInit } from '@angular/core';
import { CustomerListResponse } from '../api/response/customer-list-response';
import { CustomerService } from '../service/customer.service';
import { ErrorResponse } from '../api/response/error-response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard-customers',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './admin-dashboard-customers.component.html',
  styleUrl: './admin-dashboard-customers.component.css'
})
export class AdminDashboardCustomersComponent implements OnInit {
  customers!: CustomerListResponse;
  totalItems!: number;
  pageSize!: number;
  currentPage = 0;

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.getCustomers(this.currentPage);    
  }

  getCustomers(currentPage: number){
    this.customerService.getAll(currentPage).subscribe({
      next: (res: CustomerListResponse) =>{
        this.customers = res;
        this.totalItems = res.data.totalItems;
        this.pageSize = res.data.pageSize;
      },
      error: (err: ErrorResponse) => {
        console.log(err.error);
      }
    })
  }

  goToDetails(){

  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getCustomers(this.currentPage);
  }
}
