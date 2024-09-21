import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OkResponse } from '../api/response/ok-response';
import { AuthenticationService } from '../service/authentication.service';
import { CustomerService } from '../service/customer.service';
import { PasswordValidator } from '../validators/password-validator';

@Component({
  selector: 'app-customer-update-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './customer-update-password.component.html',
  styleUrl: './customer-update-password.component.css',
})
export class CustomerUpdatePasswordComponent {
  isSubmitted = false;
  form = new FormGroup(
    {
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\S+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^\\S+$'),
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
          alert(res.message + '\nPlease log in again');
          this.authService.logout();
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
