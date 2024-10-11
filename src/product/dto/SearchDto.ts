import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  category: number;

  @IsOptional()
  page: string;

  @IsOptional()
  pageSize: string;

  @IsOptional()
  sort: string;
}
