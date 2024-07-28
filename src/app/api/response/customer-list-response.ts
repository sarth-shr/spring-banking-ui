import { HttpStatusCode } from '@angular/common/http';
import { CustomerListPageable } from '../pageable/customer-list-pageable';

export interface CustomerListResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  data: CustomerListPageable;
}
