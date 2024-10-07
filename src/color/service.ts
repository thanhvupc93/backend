import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entity';
import { CreateColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  create(createProductDto: CreateColorDto): Promise<Color> {
    const category = new Color();
    category.title = createProductDto.title;
    category.value = createProductDto.value;
    
    return this.colorRepository.save(category);
  }

  async findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  findOne(id: number): Promise<Color> {
    return this.colorRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.colorRepository.delete(id);
  }
}