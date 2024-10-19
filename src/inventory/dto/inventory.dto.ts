import { Color } from 'src/color/color.entity';
import { Product } from 'src/product/product.entity';
import { Size } from 'src/size/size.entity';

export class CreateInventoryDto {
  id: number;
  title: string;
  value: string;
  price: number;
  color: Color;
  product: Product;
  size: Size;
}
