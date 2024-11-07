import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put, Query } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/color.dto';
import { Color } from './color.entity';
import { ResultDto } from 'src/dto/ResultDto';
import { PAGE_PAGESIZE } from 'src/contants/data';
import { SearchDto } from './dto/SearchDto';


@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Post()
  create(@Body() createColorDto: CreateColorDto): Promise<ResultDto<Color>> {
    try {
      return this.colorService.create(createColorDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Put()
  update(@Body() createColorDto: CreateColorDto): Promise<ResultDto<Color>> {
    try {
      return this.colorService.update(createColorDto);
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResultDto<Color>> {
    try {
      const page = searchDto.page ? Number(searchDto.page) : 1;
      const pageSize = searchDto.pageSize ? Number(searchDto.pageSize) : PAGE_PAGESIZE;
      const data = await this.colorService.findAll(searchDto, page, pageSize);
      if (data) {
        return data
      }
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Color> {
    return this.colorService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResultDto<Color>> {
    try {
      return this.colorService.remove(Number(id));
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }


}
