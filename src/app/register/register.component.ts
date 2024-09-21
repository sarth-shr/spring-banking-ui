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
import { SpamValidator } from '../validators/spam-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isSubmitted = false;
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
      SpamValidator,
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
      SpamValidator,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      SpamValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^\\S+$'),
    ]),
    initialDeposit: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    this.register();
    this.isSubmitted = true;
  }

  private register() {
    this.authService.register(this.form.value).subscribe({
      next: (res: OkResponse) => {
        alert(res.message);
        this.router.navigate(['/login']);
      },
    });
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
