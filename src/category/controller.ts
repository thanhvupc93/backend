import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './service';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './interfaces/Category';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Post()
  async create(@Body() createProductDto: CreateCategoryDto) {
    this.categoryService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
 
}
