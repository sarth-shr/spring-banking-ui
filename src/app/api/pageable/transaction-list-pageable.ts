export interface TransactionListPageable {
  content: [
    {
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
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}
