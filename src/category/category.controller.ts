import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './category.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResultDto } from 'src/dto/ResultDto';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Public()
  @Post()
  create(@Body() createCategorytDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategorytDto);
  }

  @Public()
  @Get()
  findAll(): Promise<ResultDto<Category>> {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }


}
