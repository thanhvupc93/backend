import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity';
import { CreateProductDto } from './dto/product.dto';
import { SearchDto } from './dto/SearchDto';
import { PagingDto } from 'src/dto/PagingDto';
import { ResultDto } from 'src/dto/ResultDto';

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

  async findAll(searchDto: SearchDto, page: number, pageSize: number): Promise<ResultDto<Product>> {
  
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.colors", "colors")
      .leftJoinAndSelect("product.inventories", "inventories")
      .where('1 = :check', { check: 1 })
    
    if (searchDto.title && searchDto.title !='undefined') {
      query.andWhere('LOWER(product.title) LIKE LOWER(:title)', { title: `%${searchDto.title.trim()}%` })
    }

    if (searchDto.category  && searchDto.category != 0) { 
       query.andWhere('category.id = :categoryId', {categoryId: searchDto.category})
    }

    const itemCount = await query.getCount();
   
    query.skip((page - 1) * pageSize).take(pageSize);
    const data: Product[] = await query.getMany();
    const paging: PagingDto = new PagingDto(page, pageSize, itemCount)
    const pageDto = new ResultDto(data, paging);
    return pageDto;
}

  findOne(id: number): Promise<Product> {
    // return this.productRepository.findOneBy({ id: id });
    return this.productRepository.findOne({
    where: { id: id },
      relations: {
          category: true,
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

  async findByKeyWord(searchDto: SearchDto): Promise<Product[]> {
   
    return this.productRepository.find(
      {
       
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