import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerResponse } from '../api/response/customer-response';
import { ErrorResponse } from '../api/response/error-response';
import { OkResponse } from '../api/response/ok-response';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-update-personal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-update-personal.component.html',
  styleUrl: './customer-update-personal.component.css',
})
export class CustomerUpdatePersonalComponent implements OnInit {
  isSubmitted = false;
  customer!: CustomerResponse;
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
    ]),
  });

  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  onSubmit() {
    this.updatePersonalInfo();
    this.isSubmitted = true;
  }

  private updatePersonalInfo() {
    let subject = this.authService.extractSubject();
    this.customerService.updatePersonal(this.form.value, subject).subscribe({
      next: (res: OkResponse) => {
        alert(res.message);
        this.router.navigate(['../']);
      },
    });
  }

  private getCustomer() {
    this.customerService.get(this.authService.extractSubject()).subscribe({
      next: (res: CustomerResponse) => {
        this.customer = res;
      },
    });
  }

  public get firstName() {
    return this.form.get('firstName');
  }

  public get lastName() {
    return this.form.get('lastName');
  }
}
