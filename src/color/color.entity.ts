import { Inventory } from 'src/inventory/inventory.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['title'])
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: string;

  @OneToMany(() => Inventory, (inventories) => inventories.color)
  inventories: Inventory[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDelete: boolean;
}
