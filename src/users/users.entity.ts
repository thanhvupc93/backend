import { Role } from 'src/role/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
  @Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { nullable: true })
  @JoinTable()
  roles: Role[];

  @Column({ nullable: true })
  fullName: string;

  @Column({ default: true })
  isActive: boolean;
}
