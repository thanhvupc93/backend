import { OrderItems } from 'src/order-items/order_items.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  userName: string;

  @Column()
  address: string;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  @JoinTable()
  orderItems: OrderItems[];
}
