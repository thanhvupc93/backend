import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Query} from '@nestjs/common';
import { ProductService } from './service';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './entity';
import { SearchDto } from './dto/SearchDto';
import { ResultDto } from 'src/dto/ResultDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResultDto<Product>>{
    try {
      const page = searchDto.page ? Number(searchDto.page) : 1;
      const pageSize = searchDto.pageSize ? Number(searchDto.pageSize) : 2;
      const data= await this.productService.findAll(searchDto, page, pageSize);
      if (data) {
        return data
      }
      throw Error();
    } catch (error) {
      console.log(error)
       throw Error();
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get('search-category/:id')
  findByCategory(@Param('id', ParseIntPipe) id: number): Promise<Product[]> {
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
