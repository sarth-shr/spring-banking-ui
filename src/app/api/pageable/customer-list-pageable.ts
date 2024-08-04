import { Customer } from "../../model/customer";

export interface CustomerListPageable {
  content: Customer[];
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}
