import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/product.dto';
import { SearchDto } from './dto/SearchDto';
import { PagingDto } from 'src/dto/PagingDto';
import { ResultDto } from 'src/dto/ResultDto';
import { Inventory } from 'src/inventory/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private dataSource: DataSource

  ) {}

  async create(createProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productRepository = queryRunner.manager.getRepository(Product);
      const inventoryRepository = queryRunner.manager.getRepository(Inventory);

    const product = new Product();
      product.image = '/images/logo.jpg';
      product.title = createProductDto.title;
      product.type = createProductDto.type;
      product.description = createProductDto.description;
      product.defaultPrice = createProductDto.defaultPrice;


      product.colors = createProductDto.colors;
      product.category = createProductDto.category;
      product.sizes = createProductDto.sizes;
      product.isActive = true;
      product.isDelete = false;

      const inventories: Inventory[] = await Promise.all(
        createProductDto.inventories.map(async itemData => {
          return await inventoryRepository.save(itemData);
        })
      );

      product.inventories = inventories;
      const data: Product = await productRepository.save(product);
      await queryRunner.commitTransaction();
      return new ResultDto(data, null, null);
    } catch (error) {
      // If any update fails, rollback the transaction
      await queryRunner.rollbackTransaction();
      return new ResultDto(null, null, error.message);
    } finally {
      // Release the query runner to free up database resources
      await queryRunner.release();
    }
  }

  async update(updateProductDto: CreateProductDto): Promise<ResultDto<Product>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productRepository = queryRunner.manager.getRepository(Product);
      const inventoryRepository = queryRunner.manager.getRepository(Inventory);
      const query = this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect("product.sizes", "sizes")
        .leftJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.colors", "colors")
        .leftJoinAndSelect("product.inventories", "inventories")
        .where("product.id = :id", { id: updateProductDto.id })
        .andWhere("product.isActive = :isActive", { isActive: true })
        .andWhere("product.isDelete = :isDelete", { isDelete: false })


      const product: Product = await query.getOne();
      product.image = updateProductDto.image ? updateProductDto.image : '/images/logo.jpg';
      product.title = updateProductDto.title;
      product.type = updateProductDto.type;
      product.description = updateProductDto.description;
      product.defaultPrice = updateProductDto.defaultPrice;
      product.colors = updateProductDto.colors;
      product.category = updateProductDto.category;
      product.sizes = updateProductDto.sizes;
      product.isActive = updateProductDto.isActive;


      const { withId, withNullId } = updateProductDto.inventories.reduce(
        (acc, item) => {
          if (!item.id) {
            acc.withNullId.push(item);
          } else {
            acc.withId.push(item);
          }
          return acc;
        },
        { withId: [], withNullId: [] }
      );
      withNullId.map(async itemData => {
        await inventoryRepository.save(itemData);
      });
      // update inventories
      withId.map(async itemData => {
        const updateInventories = await inventoryRepository.findOne({
          where: { id: itemData.id }
        });
        updateInventories.price = itemData.price;
        updateInventories.quantity = itemData.quantity;

        return await inventoryRepository.save(updateInventories);
      });
      // list detele 
      const resultDetele = product.inventories.filter(itemA => !withId.some(itemB => itemB.id === itemA.id));
      resultDetele.map(async itemData => {
        return await this.inventoryRepository.delete(itemData.id)
      });

      product.inventories = updateProductDto.inventories;
      const data: Product = await productRepository.save(product);
      await queryRunner.commitTransaction();
      return new ResultDto(data, null);
    } catch (error) {
      // If any update fails, rollback the transaction
      await queryRunner.rollbackTransaction();
      return new ResultDto(null, null, error.message);
    } finally {
      // Release the query runner to free up database resources
      await queryRunner.release();
    }

  }

  async findAll(searchDto: SearchDto, page: number, pageSize: number): Promise<ResultDto<Product>> {

    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.colors", "colors")
      .leftJoinAndSelect("product.inventories", "inventories")
      .where('1 = :check', { check: 1 })

    if (searchDto.title && searchDto.title != 'undefined') {
      query.andWhere('LOWER(product.title) LIKE LOWER(:title)', { title: `%${searchDto.title.trim()}%` })
    }

    if (searchDto.category && searchDto.category != 0) {
      query.andWhere('category.id = :categoryId', { categoryId: searchDto.category })
    }

    const itemCount = await query.getCount();
    query.skip((page - 1) * pageSize).take(pageSize);
    const data: Product[] = await query.getMany();
    const paging: PagingDto = new PagingDto(page, pageSize, itemCount)
    return new ResultDto(data, paging);
  }

  async findOne(id: number): Promise<ResultDto<Product>> {

    const data: Product = await this.productRepository.findOne({
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
     return new ResultDto(data, null);

  }

  async findByCategory(id: number): Promise<ResultDto<Product>> {
    const data: Product[] = await this.productRepository.find(
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
    return new ResultDto(data)
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