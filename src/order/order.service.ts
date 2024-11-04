import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderItems } from 'src/order-items/order_items.entity';
import { InventoryService } from 'src/inventory/inventory.service';



@Injectable()
export class OrderService {
  
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,
    private readonly inventoryService: InventoryService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
     const order = await this.orderRepository.create(createOrderDto);
     // Save OrderItems first
    const result = await this.orderRepository.save(order)
    // Create OrderItems
       const orderItems = createOrderDto.orderItems.map(itemData => {
         const orderItem = this.orderItemsRepository.create(itemData);      
         orderItem.order = result;
            return orderItem;
       });
    // const order = this.orderRepository.create({ createOrderDto, orderItems });
    createOrderDto.orderItems = orderItems;
    await this.orderItemsRepository.save(orderItems);
    // subtraction quantity
    orderItems.map(itemData => {
      this.inventoryService.upDateQuantity(itemData.inventories.id, itemData.quantity);
       });
    return  result;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findById(id: number): Promise<Order> {
    const data: Order = await this.orderRepository.findOne({
      where: { id: id },
      relations: {
        orderItems: {
          inventories: {
            color: true,
            size: true
          }
        }
      },
    });
    return data;
  }


  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
