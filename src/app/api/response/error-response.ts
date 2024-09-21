import { HttpStatusCode } from '@angular/common/http';

export interface ErrorResponse {
  timestamp: Date;
  code: number;
  status: HttpStatusCode;
  message: string;
}
