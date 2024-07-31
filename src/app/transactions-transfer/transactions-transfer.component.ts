import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../service/transaction.service';
import { OkResponse } from '../api/response/ok-response';
import { Router } from '@angular/router';
import { ErrorResponse } from '../api/response/error-response';

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
    toId: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
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
    let fromId = sessionStorage.getItem('accId') as string;
    let toId = this.form.get('toId')?.value as string;
    let amount = this.form.get('amount')?.value as string;

    this.transactionService
      .transfer(parseInt(fromId), parseInt(toId), parseInt(amount))
      .subscribe({
        next: (res: OkResponse) => {
          alert(res.message);
          this.router.navigate(['/accounts'])
        },
        error: (err: ErrorResponse) => {
          alert(err.error);
          window.location.reload();
        }
      });
  }

  public get toId() {
    return this.form.get('toId');
  }

  public get amount() {
    return this.form.get('amount');
  }
}
