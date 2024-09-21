import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OkResponse } from '../api/response/ok-response';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-transactions-transfer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transactions-transfer.component.html',
  styleUrl: './transactions-transfer.component.css',
})
export class TransactionsTransferComponent {
  isSubmitted = false;

  form = new FormGroup({
    toAccNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\S+$'),
    ]),
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
    this.transferFunds();
    this.isSubmitted = true;
  }

  private transferFunds() {
    let fromAccNumber = localStorage.getItem('accNumber') as string;
    let toAccNumber = this.form.get('toAccNumber')?.value as string;
    let amount = this.form.get('amount')?.value as string;

    this.transactionService
      .transfer(fromAccNumber, toAccNumber, parseInt(amount))
      .subscribe({
        next: (res: OkResponse) => {
          alert(res.message);
          this.router.navigate(['/accounts']);
        },
      });
  }

  public get toAccNumber() {
    return this.form.get('toAccNumber');
  }

  public get amount() {
    return this.form.get('amount');
  }
}
