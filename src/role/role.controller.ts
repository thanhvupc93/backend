import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Public()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.roleService.remove(id);
  }
}