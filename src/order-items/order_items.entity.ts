import { Inventory } from 'src/inventory/entity';
import { Order } from 'src/order/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { nullable: true })
  price: number;

  @Column('numeric', { nullable: true })
  quantity: number;

  @ManyToOne(() => Inventory, (inventories) => inventories.orderItems)
  inventories: Inventory;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
