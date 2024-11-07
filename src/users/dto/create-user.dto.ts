import { Role } from 'src/role/role.entity';

export class CreateUserDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  userName: string;
  password: string;
  isActive: boolean;
  roles: Role[];
  roleIds: number[];
}
