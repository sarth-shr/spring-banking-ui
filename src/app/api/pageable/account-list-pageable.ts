import { Account } from "../../model/account";

export interface AccountListPageable {
  content: Account[];
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}
