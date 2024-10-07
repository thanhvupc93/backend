import { Color } from 'src/color/entity';
import { Product } from 'src/product/entity';
import { Size } from 'src/size/entity';

export class CreateInventoryDto {
  id: number;
  title: string;
  value: string;
  price: number;
  color: Color;
  product: Product;
  size: Size;
}
