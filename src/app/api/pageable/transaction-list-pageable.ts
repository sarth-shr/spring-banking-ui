export interface TransactionListPageable {
  content: [
    {
      id: number;
      date: Date;
      type: string;
      fromAccId: number;
      fromAccOldBalnce: number;
      fromAccNewBalance: number;
      toAccId: number;
      toAccOldBalance: number;
      toAccNewBalace: number;
    }
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}
