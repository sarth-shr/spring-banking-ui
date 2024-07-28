import { Routes } from '@angular/router';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

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
  },
  {
    path: 'account',
    title: 'Account Management',
    component: CustomerAccountComponent,
  },
  {
    path: '',
    title: 'Home Page',
    component: CustomerDashboardComponent,
    canActivate: [authGuard],
  },
];
