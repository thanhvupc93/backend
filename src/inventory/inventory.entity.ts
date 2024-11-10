import { Color } from 'src/color/color.entity';
import { OrderItems } from 'src/order-items/order_items.entity';
import { Size } from 'src/size/size.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((optional = true) => Color, (color) => color.inventories)
  color: Color;

  @ManyToOne((optional = true) => Size, (size) => size.inventories)
  size: Size;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.inventories)
  orderItems: OrderItems[];

  @Column('numeric', { nullable: true })
  price: number;

  @Column('numeric', { nullable: true })
  quantity: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDelete: boolean;
}
