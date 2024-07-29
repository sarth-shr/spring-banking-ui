import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerResponse } from '../api/response/customer-response';
import { OkResponse } from '../api/response/ok-response';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { ErrorResponse } from '../api/response/error-response';

@Component({
  selector: 'app-customer-update-personal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-update-personal.component.html',
  styleUrl: './customer-update-personal.component.css',
})
export class CustomerUpdatePersonalComponent implements OnInit {
  customer!: CustomerResponse;
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  public get firstName() {
    return this.form.get('firstName');
  }

  public get lastName() {
    return this.form.get('lastName');
  }

  private updatePersonalInfo() {
    let subject = this.authService.extractSubject();
    this.customerService.updatePersonal(this.form.value, subject).subscribe({
      next: (res: OkResponse) => {
        alert(res.message);
        this.router.navigate(['../'])
      },
      error: (err: ErrorResponse) => {
        alert(err.error);
      },
    });
  }

  private getCustomer(){
    this.customerService.get(this.authService.extractSubject()).subscribe({
      next: (res: CustomerResponse) =>{
        this.customer = res;
      },
      error: (err: ErrorResponse)=>{
        alert(err.error);
      }
    })
  }

  onSubmit() {
    this.updatePersonalInfo();
  }
}
