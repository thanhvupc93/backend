import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';


@Injectable()
export class RoleService {
  
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    await this.roleRepository.save(createRoleDto);
   
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
