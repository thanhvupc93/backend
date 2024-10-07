import { Category } from 'src/category/entity';
import { Color } from 'src/color/entity';
import { Inventory } from 'src/inventory/entity';
import { Size } from 'src/size/entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column('numeric', { nullable: true })
  defaultPrice: number;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Inventory)
  @JoinTable()
  inventories: Inventory[];

  @ManyToMany(() => Color)
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Size)
  @JoinTable()
  sizes: Size[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDelete: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
