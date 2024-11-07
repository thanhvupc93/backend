import { Inventory } from 'src/inventory/inventory.entity';

export class CreateOrderItemsDto {
  quantity: number;
  price: number;
  inventories: Inventory;
}
