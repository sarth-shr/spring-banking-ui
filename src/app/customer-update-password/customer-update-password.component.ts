import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { PasswordValidator } from '../validators/password-validator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-customer-update-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './customer-update-password.component.html',
  styleUrl: './customer-update-password.component.css',
})
export class CustomerUpdatePasswordComponent {
  form = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  }, {validators: PasswordValidator});

  constructor(private customerService: CustomerService) {}

  onSubmit() {}

  public get currentPassword() {
    return this.form.get('currentPassword');
  }

  public get newPassword() {
    return this.form.get('newPassword');
  }

  public get confirmNewPassword() {
    return this.form.get('confirmNewPassword');
  }
}
