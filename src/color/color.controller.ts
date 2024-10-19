import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/color.dto';
import { Color } from './color.entity';


@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Post()
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Color> {
    return this.colorService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.colorService.remove(id);
  }


}
