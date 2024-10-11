import { PagingDto } from './PagingDto';

export class ResultDto<T> {
  data: T[];
  paging: PagingDto;

  constructor(data: T[], paging: PagingDto) {
    this.data = data;
    this.paging = paging;
  }
}
