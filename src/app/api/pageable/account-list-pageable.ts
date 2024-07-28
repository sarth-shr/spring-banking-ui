export interface AccountListPageable {
  content: [
    {
      id: number;
      type: string;
      balance: string;
      interest: number;
      customerEmail: string;
    }
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}
