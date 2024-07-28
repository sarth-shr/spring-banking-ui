import { HttpStatusCode } from "@angular/common/http";

export interface OkResponse {
  timestamp: Date,
  code: number,
  status: HttpStatusCode,
  message: string
}
