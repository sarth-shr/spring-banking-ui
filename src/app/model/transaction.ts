import { Account } from './account';

export interface Transaction {
  id: number;
  date: Date;
  type: string;
  amount: number;
  fromAccount: Account;
  fromAccOldBalance: number;
  fromAccNewBalance: number;
  toAccount: Account;
  toAccOldBalance: number;
  toAccNewBalance: number;
}
