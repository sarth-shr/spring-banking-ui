import { Component } from '@angular/core';
import { AccountListResponse } from '../api/response/account-list-response';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent {
  accounts!: AccountListResponse;

  constructor(private accountService: AccountService){}

  
}
