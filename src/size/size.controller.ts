import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put, Query } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/size.dto';
import { Size } from './size.entity';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from 'src/size/dto/SearchDto';
import { PAGE_PAGESIZE } from 'src/contants/data';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('sizes')
export class SizeController {
  constructor(private readonly sizeService: SizeService) { }

  @Post()
  create(@Body() createSizeDto: CreateSizeDto): Promise<ResultDto<Size>> {
    try {
      return this.sizeService.create(createSizeDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Put()
  update(@Body() createSizeDto: CreateSizeDto): Promise<ResultDto<Size>> {
    try {
      return this.sizeService.update(createSizeDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Public()
  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResultDto<Size>> {
    try {
      const page = searchDto.page ? Number(searchDto.page) : 1;
      const pageSize = searchDto.pageSize ? Number(searchDto.pageSize) : PAGE_PAGESIZE;
      const data = await this.sizeService.findAll(searchDto, page, pageSize);
      if (data) {
        return data
      }
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Size> {
    return this.sizeService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResultDto<Size>> {
    try {
      return this.sizeService.remove(Number(id));
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }


}
