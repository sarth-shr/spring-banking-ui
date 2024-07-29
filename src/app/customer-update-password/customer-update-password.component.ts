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
import { AuthenticationService } from '../service/authentication.service';
import { OkResponse } from '../api/response/ok-response';
import { ErrorResponse } from '../api/response/error-response';

@Component({
  selector: 'app-customer-update-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './customer-update-password.component.html',
  styleUrl: './customer-update-password.component.css',
})
export class CustomerUpdatePasswordComponent {
  form = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: PasswordValidator }
  );

  constructor(
    private customerService: CustomerService,
    private authService: AuthenticationService
  ) {}

  onSubmit() {
    this.update();
  }

  private update() {
    this.customerService
      .updatePassword(
        this.currentPassword?.value,
        this.password?.value,
        this.authService.extractSubject()
      )
      .subscribe({
        next: (res: OkResponse) => {
          alert(res.message);
          this.authService.logout();
        },
        error: (err: ErrorResponse) => {
          console.log(err);
        },
      });
  }

  public get currentPassword() {
    return this.form.get('currentPassword');
  }

  public get password() {
    return this.form.get('password');
  }

  public get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
