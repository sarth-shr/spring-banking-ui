import { Component, OnInit } from '@angular/core';
import { CustomerResponse } from '../api/response/customer-response';
import { CustomerService } from '../service/customer.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent implements OnInit {
  customer!: CustomerResponse;

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    const token = sessionStorage.getItem('user-token');
    let payload;
    if (token) {
      payload = token.split('.')[1];
      let decodedPayload = window.atob(payload);
      let payloadObject = JSON.parse(decodedPayload);
      this.customerService.get(payloadObject.sub).subscribe({
        next: (res)=>{
          this.customer = res;
        },
        error: (err)=>{
          console.log(err.error);
        }
      })
    }
  }
}
