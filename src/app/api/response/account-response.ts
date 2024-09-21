import { HttpStatusCode } from '@angular/common/http';
import { Account } from '../../model/account';

export interface AccountResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  response: Account;
}
