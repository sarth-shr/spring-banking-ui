import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorResponse } from '../api/response/error-response';
import { OkResponse } from '../api/response/ok-response';
import { AuthenticationService } from '../service/authentication.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isSubmitted = false;
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    initialDeposit: new FormControl('', [
      Validators.required,
      Validators.min(1000),
    ]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  private register() {
    this.authService.register(this.form.value).subscribe({
      next: (res: OkResponse) => {
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: (err: ErrorResponse) => {
        alert(err.error);
      },
    });
  }

  onSubmit() {
    this.register();
  }

  public get firstName() {
    return this.form.get('firstName');
  }

  public get lastName() {
    return this.form.get('lastName');
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  public get initialDeposit() {
    return this.form.get('initialDeposit');
  }
}
