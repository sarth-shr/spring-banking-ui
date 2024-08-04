import { Transaction } from '../../model/transaction';

export interface TransactionListPageable {
  content: Transaction[];
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}
