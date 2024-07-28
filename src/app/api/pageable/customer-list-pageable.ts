export interface CustomerListPageable {
  content: [
    {
      firstName: string;
      lastName: string;
      email: string;
      initialDeposti: number;
    }
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}
