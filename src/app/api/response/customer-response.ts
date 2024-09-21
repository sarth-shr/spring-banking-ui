import { HttpStatusCode } from '@angular/common/http';
import { Customer } from '../../model/customer';

export interface CustomerResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  response: Customer;
}
