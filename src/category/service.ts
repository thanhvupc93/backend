import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createProductDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.image = createProductDto.image;
    category.title = createProductDto.title;
    category.type = createProductDto.type;
    
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}