import { Color } from 'src/color/entity';
import { Size } from 'src/size/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Color, (color) => color.inventories)
  color: Color;

  @ManyToOne(() => Size, (size) => size.inventories)
  size: Size;

  @Column()
  value: number;

  @Column('numeric', { nullable: true })
  price: number;

  @Column('numeric', { nullable: true })
  quantity: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDelete: boolean;
}
