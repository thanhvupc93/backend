import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './service';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './interfaces/Product';
import { ProductType } from 'src/common/constants';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
   @Get('/food')
  async findAllFood(): Promise<Product[]> {
    return this.productService.findAll().filter(element => element.category === ProductType.FOOD);
  }
  @Get('/clothing')
  async findAllClothing(): Promise<Product[]> {
    return this.productService.findAll().filter(element => element.category === ProductType.CLOTHING);
  }
}
