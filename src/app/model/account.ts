import { Customer } from './customer';

export interface Account {
  id: number;
  type: string;
  balance: number;
  interest: number;
  customer: Customer;
}
