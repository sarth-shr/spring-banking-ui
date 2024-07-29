import { Routes } from '@angular/router';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerUpdatePersonalComponent } from './customer-update-personal/customer-update-personal.component';
import { CustomerUpdateSecurityComponent } from './customer-update-security/customer-update-security.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
    path: 'profile/update-personal',
    title: 'Update Personal Information',
    component: CustomerUpdatePersonalComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/update-security',
    title: 'Update Security Information',
    component: CustomerUpdateSecurityComponent,
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
