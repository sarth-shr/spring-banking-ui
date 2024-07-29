import { Routes } from '@angular/router';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'register',
    title: 'Sign Up',
    component: RegisterComponent,
  },
  {
    path: 'login',
    title: 'Log In',
    component: LoginComponent,
  },
  {
    path: 'profile',
    title: 'Profile Management',
    component: CustomerProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account',
    title: 'Account Management',
    component: CustomerAccountComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];
