export interface CustomerListPageable {
  content: [
    {
      firstName: string;
      lastName: string;
      email: string;
      initialDeposit: number;
    }
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}
