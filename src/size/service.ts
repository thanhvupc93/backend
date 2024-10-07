import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entity';
import { CreateSizeDto } from './dto/size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  create(createSizeDto: CreateSizeDto): Promise<Size> {
    const category = new Size();
    category.title = createSizeDto.title;
    category.value = createSizeDto.value;
    
    return this.sizeRepository.save(category);
  }

  async findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  findOne(id: number): Promise<Size> {
    return this.sizeRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.sizeRepository.delete(id);
  }
}