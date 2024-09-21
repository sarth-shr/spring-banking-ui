import { HttpStatusCode } from '@angular/common/http';
import { TransactionListPageable } from '../pageable/transaction-list-pageable';

export interface TransactionListResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  response: TransactionListPageable;
}
