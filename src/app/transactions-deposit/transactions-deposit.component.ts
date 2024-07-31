import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-transactions-deposit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transactions-deposit.component.html',
  styleUrl: './transactions-deposit.component.css',
})
export class TransactionsDepositComponent {
  form = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(private transactionService: TransactionService) {}

  onSubmit() {
    this.depositFunds();
  }

  private depositFunds() {
    let id = sessionStorage.getItem('accId') as string;
    let amount = this.form.get('amount')?.value as string;
    this.transactionService.deposit(parseInt(id), parseInt(amount));
  }

  public get amount() {
    return this.form.get('amount');
  }
}
