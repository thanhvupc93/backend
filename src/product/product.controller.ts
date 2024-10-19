import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { SearchDto } from './dto/SearchDto';
import { ResultDto } from 'src/dto/ResultDto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Public()
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Public()
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

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
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

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }


}
