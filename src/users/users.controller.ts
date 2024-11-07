import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from './dto/SearchDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<ResultDto<User>> {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Put()
  update(@Body() createUserDto: CreateUserDto): Promise<ResultDto<User>> {
    try {
      return this.usersService.update(createUserDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResultDto<User>> {
    try {
      const page = searchDto.page ? Number(searchDto.page) : 1;
      const pageSize = searchDto.pageSize ? Number(searchDto.pageSize) : 10;
      const data = await this.usersService.findAll(searchDto, page, pageSize);
      if (data) {
        return data
      }
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResultDto<User>> {
    try {
      return this.usersService.remove(Number(id));
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }
}