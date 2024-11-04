import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemsDto } from './dto/create-order.dto';
import { OrderItems } from './order_items.entity';

@Injectable()
export class OrderItemsService {
  
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderRepository: Repository<OrderItems>,
  ) { }

  async create(createOrderItemsDto: CreateOrderItemsDto) {
    return await this.orderRepository.save(createOrderItemsDto);
  }

  async creates(createOrderItemsDtos: CreateOrderItemsDto[]) {
    return await this.orderRepository.save(createOrderItemsDtos);
  }

  async findAll(): Promise<OrderItems[]> {
    return this.orderRepository.find();
  }

  findById(id: number): Promise<OrderItems> {
    return this.orderRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
