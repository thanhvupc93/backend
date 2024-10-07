import { Inventory } from 'src/inventory/entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
