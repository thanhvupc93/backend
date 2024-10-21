import { PagingDto } from './PagingDto';

export class ResultDto<T> {
  data: T[] | T;
  paging: PagingDto;

  constructor(data: T[] | T, paging?: PagingDto) {
    this.data = data;
    this.paging = paging;
  }
}
