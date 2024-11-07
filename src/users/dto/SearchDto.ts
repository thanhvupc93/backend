import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  page: string;

  @IsOptional()
  pageSize: string;

  @IsOptional()
  sort: string;
}
