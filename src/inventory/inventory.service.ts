import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entity';
// import { InventorySizeDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  // create(createSizeDto: CreateInventoryDto): Promise<Inventory> {
  //   const category = new Inventory();
  //   category.value = createSizeDto.value;
  //   category.color = createSizeDto.color;
  //   category.product = createSizeDto.product;
  //   category.size = createSizeDto.size;
    
  //   return this.inventoryRepository.save(category);
  // }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  async upDateQuantity(id: number, quantity: number): Promise<Inventory> {
    const data = await this.inventoryRepository.findOneBy({ id: id });
    data.quantity = data.quantity - quantity;
    console.log('data:', data)
    return this.inventoryRepository.save(data);
  }

  findOne(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}