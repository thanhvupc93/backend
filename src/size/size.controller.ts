import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/size.dto';
import { Size } from './size.entity';


@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) { }

  @Post()
  create(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  findAll(): Promise<Size[]> {
    return this.sizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Size> {
    return this.sizeService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sizeService.remove(id);
  }


}
