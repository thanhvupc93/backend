export interface CustomResponse<T> {
  data?: T;
  paging: {
    page?: number,
    pageSize?: number,
    totalPages?: number,
    total: number,
  };
}
