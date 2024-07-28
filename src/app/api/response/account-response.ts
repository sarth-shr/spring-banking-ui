import { HttpStatusCode } from '@angular/common/http';

export interface AccountResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    type: string;
    balance: number;
    interest: number;
    customerEmail: string;
  };
}
