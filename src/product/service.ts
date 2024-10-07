import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.image = createProductDto.image;
    product.title = createProductDto.title;
    product.type = createProductDto.type;
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find(
      {
        relations: {
          colors: true,
          inventories: {
            color: true,
            size: true
          },
          sizes: true
        },
      }
    );
  }

  findOne(id: number): Promise<Product> {
    // return this.productRepository.findOneBy({ id: id });
    return this.productRepository.findOne({
    where: { id: id },
    relations: {
          colors: true,
          inventories: {
            color: true,
            size: true
          },
          sizes: true
        },
    });
   
  }

  async findByCategory(id: number): Promise<Product[]> {
    return this.productRepository.find(
      {
        where: {
          category: {
          id
          }
        },
        relations: {
          category: true,
          colors: true,
          inventories: {
            color: true,
            size: true
          },
          sizes: true
        },
      }
    );
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}