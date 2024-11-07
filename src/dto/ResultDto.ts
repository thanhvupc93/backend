import { PagingDto } from './PagingDto';

export class ResultDto<T> {
  data: T[] | T;
  paging: PagingDto;
  message: string;

  constructor(data: T[] | T, paging?: PagingDto, message?: string) {
    this.data = data;
    this.paging = paging;
    this.message = message;
  }
}
