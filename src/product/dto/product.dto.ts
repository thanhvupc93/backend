import { IsOptional } from 'class-validator';
import { Category } from 'src/category/category.entity';
import { Color } from 'src/color/color.entity';
import { Inventory } from 'src/inventory/inventory.entity';
import { Size } from 'src/size/size.entity';

export class CreateProductDto {
  @IsOptional()
  id: number;
  image: string;
  title: string;
  type: string;
  description: string;
  defaultPrice: number;
  @IsOptional()
  inventories: Inventory[];
  @IsOptional()
  colors: Color[];
  @IsOptional()
  category: Category;
  @IsOptional()
  sizes: Size[];
  isActive: boolean;
  isDelete: boolean;
}
