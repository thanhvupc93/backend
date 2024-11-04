import { Inventory } from 'src/inventory/entity';

export class CreateOrderItemsDto {
  quantity: number;
  price: number;
  inventories: Inventory;
}
