import { HttpStatusCode } from '@angular/common/http';

export interface CustomerResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    initialDeposit: number;
  };
}
