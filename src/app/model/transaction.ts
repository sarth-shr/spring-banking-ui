export interface Transaction {
  date: Date;
  type: string;
  transactionNumber: string;
  amount: number;
  fromAccNumber: string;
  fromAccOldBalance: number;
  fromAccNewBalance: number;
  toAccNumber: number;
  toAccOldBalance: number;
  toAccNewBalance: number;
}
