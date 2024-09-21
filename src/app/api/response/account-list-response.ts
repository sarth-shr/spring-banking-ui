import { HttpStatusCode } from '@angular/common/http';
import { AccountListPageable } from '../pageable/account-list-pageable';

export interface AccountListResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  response: AccountListPageable;
}
