export interface Transaction {
  id: number;
  date: Date;
  type: string;
  amount: number;
  fromAccountId: number;
  fromAccOldBalance: number;
  fromAccNewBalance: number;
  toAccountId: number;
  toAccOldBalance: number;
  toAccNewBalance: number;
}
