import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItems } from './order_items.entity';
import { OrderItemsService } from './order_items.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateOrderItemsDto } from './dto/create-order.dto';

@Controller('orderItems')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Public()
  @Post()
  create(@Body() createOrderDto: CreateOrderItemsDto){
    return this.orderItemsService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<OrderItems[]> {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderItems> {
    return this.orderItemsService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.orderItemsService.remove(id);
  }
}