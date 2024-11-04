import { OrderItems } from 'src/order-items/order_items.entity';

export class CreateOrderDto {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  orderItems: OrderItems[];
}
