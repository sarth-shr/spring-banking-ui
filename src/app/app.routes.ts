import { Routes } from '@angular/router';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerUpdateEmailComponent } from './customer-update-email/customer-update-email.component';
import { CustomerUpdatePersonalComponent } from './customer-update-personal/customer-update-personal.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { CustomerUpdatePasswordComponent } from './customer-update-password/customer-update-password.component';

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
    path: 'profile/update-personal',
    title: 'Update Personal Information',
    component: CustomerUpdatePersonalComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/update-email',
    title: 'Update Email Address',
    component: CustomerUpdateEmailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/update-password',
    title: 'Change Your Password',
    component: CustomerUpdatePasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: '**',
    title: 'ERROR 404: NOT FOUND',
    component: PageNotFoundComponent,
  },
];
