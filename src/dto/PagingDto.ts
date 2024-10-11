export class PagingDto {
  page: number;

  take: number;

  itemCount: number;

  pageCount: number;

  hasPreviousPage: boolean;

  hasNextPage: boolean;

  constructor(page: number, take: number, itemCount: number) {
    this.page = page;
    this.take = take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1 ? true : false;
    this.hasNextPage = this.page < this.pageCount ? true : false;
  }
}
