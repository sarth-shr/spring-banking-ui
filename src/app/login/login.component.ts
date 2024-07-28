import { JsonPipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  private login() {
    let email = this.form.value.email as string;
    let password = this.form.value.password as string;

    this.authService.login(email, password).subscribe({
      next: (res: HttpResponse<OkResponse>) => {
        alert('Logged in successfully, will be redirected shortly');
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err: ErrorResponse) => {
        alert(err.error);
      },
    });
  }

  onSubmit() {
    this.login();
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }
}
