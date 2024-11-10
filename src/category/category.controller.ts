import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './category.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from './dto/SearchDto';
import { PAGE_PAGESIZE } from 'src/contants/data';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Public()
  @Post()
  create(@Body() createCategorytDto: CreateCategoryDto): Promise<ResultDto<Category>> {
    try {
      return this.categoryService.create(createCategorytDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Put()
  update(@Body() createCategorytDto: CreateCategoryDto): Promise<ResultDto<Category>> {
    try {
      return this.categoryService.update(createCategorytDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Public()
  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResultDto<Category>> {
    try {
      const page = searchDto.page ? Number(searchDto.page) : 1;
      const pageSize = searchDto.pageSize ? Number(searchDto.pageSize) : PAGE_PAGESIZE;
      const data = await this.categoryService.findAll(searchDto, page, pageSize);
      if (data) {
        return data
      }
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }


  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResultDto<Category>> {
    try {
      return this.categoryService.remove(Number(id));
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }


}
