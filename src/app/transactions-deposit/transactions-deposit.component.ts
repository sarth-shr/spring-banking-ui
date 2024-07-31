import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../service/transaction.service';
import { OkResponse } from '../api/response/ok-response';
import { ErrorResponse } from '../api/response/error-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-deposit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transactions-deposit.component.html',
  styleUrl: './transactions-deposit.component.css',
})
export class TransactionsDepositComponent {
  isSubmitted = false;
  form = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.min(1000),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  onSubmit() {
    this.depositFunds();
    this.isSubmitted = true;
  }

  private depositFunds() {
    let id = sessionStorage.getItem('accId') as string;
    let amount = this.form.get('amount')?.value as string;
    
    this.transactionService.deposit(parseInt(id), parseInt(amount)).subscribe({
      next: (res: OkResponse) => {
        alert(res.message);
        this.router.navigate(['/accounts']);
      },
    });
  }

  public get amount() {
    return this.form.get('amount');
  }
}
