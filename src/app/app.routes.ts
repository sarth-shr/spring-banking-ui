import { Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountOpenComponent } from './account-open/account-open.component';
import { AccountComponent } from './account/account.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerUpdateEmailComponent } from './customer-update-email/customer-update-email.component';
import { CustomerUpdatePasswordComponent } from './customer-update-password/customer-update-password.component';
import { CustomerUpdatePersonalComponent } from './customer-update-personal/customer-update-personal.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { TransactionsDepositComponent } from './transactions-deposit/transactions-deposit.component';
import { TransactionsTransferComponent } from './transactions-transfer/transactions-transfer.component';

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
    path: 'account',
    title: 'Account Management',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account/open',
    title: 'Open An Account',
    component: AccountOpenComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account/details',
    title: 'Account Details',
    component: AccountDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    title: 'Transaction History',
    component: TransactionsHistoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transactions/deposit',
    title: 'Deposit Funds',
    component: TransactionsDepositComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transactions/transfer',
    title: 'Transfer Funds',
    component: TransactionsTransferComponent,
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
