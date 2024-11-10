import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Query, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { SearchDto } from './dto/SearchDto';
import { ResultDto } from 'src/dto/ResultDto';
import { Public } from 'src/auth/decorators/public.decorator';
import { PAGE_PAGESIZE } from 'src/contants/data';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }


  @Put()
  update(@Body() createProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    try {
      return this.productService.update(createProductDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Public()
  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResultDto<Product>> {
    try {
      const page = searchDto.page ? Number(searchDto.page) : 1;
      const pageSize = searchDto.pageSize ? Number(searchDto.pageSize) : PAGE_PAGESIZE;
      const data = await this.productService.findAll(searchDto, page, pageSize);
      if (data) {
        return data
      }
      throw Error();
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResultDto<Product>> {
    try {
      const data = this.productService.findOne(id)
      if (data) {
        return data
      }
      throw Error();
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Public()
  @Get('search-category/:id')
  findByCategory(@Param('id', ParseIntPipe) id: number): Promise<ResultDto<Product>> {
    try {
      return this.productService.findByCategory(id)
    } catch (error) {
      console.log(error)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }


}
