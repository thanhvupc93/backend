import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
// import { CreateInventoryDto } from './dto/inventory.dto';
import { Inventory } from './entity';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  // @Post()
  // create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory> {
  //   return this.inventoryService.create(createInventoryDto);
  // }

  @Public()
  @Get()
  findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Inventory> {
    return this.inventoryService.findOne(id);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inventoryService.remove(id);
  }


}
