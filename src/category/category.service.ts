import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/category.dto';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from './dto/SearchDto';
import { PagingDto } from 'src/dto/PagingDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateCategoryDto): Promise<ResultDto<Category>> {
    try {
      const category = new Category();
      category.image = createProductDto.image;
      category.title = createProductDto.title;
      category.type = createProductDto.type;
      category.isActive = createProductDto.isActive;
      const data: Category = await this.categoryRepository.save(category);
      return new ResultDto(data, null, null);
    } catch (error) {
      if (error.code === "23505") {
        console.log(error)
      }
      return new ResultDto(null, null, 'size exist');
    }

  }

  async update(createProductDto: CreateCategoryDto): Promise<ResultDto<Category>> {
    const dataSave: Category = await this.categoryRepository.findOne({
      where: { id: createProductDto.id }
    });
    if (!dataSave) {
      console.log('Category not found');
      return;
    }
    dataSave.image = createProductDto.image;
    dataSave.title = createProductDto.title;
    dataSave.type = createProductDto.type;
    dataSave.isActive = createProductDto.isActive;
    const data: Category = await this.categoryRepository.save(dataSave);
    return new ResultDto(data, null);
  }


  async findAll(searchDto: SearchDto, page: number, pageSize: number): Promise<ResultDto<Category>> {
    const query = this.categoryRepository.createQueryBuilder('category')
      .where("category.isDelete = :isDelete", { isDelete: false })
    if (searchDto.search && searchDto.search != 'undefined') {
      query.andWhere('LOWER(category.title) LIKE LOWER(:title)', { title: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(category.type) LIKE LOWER(:type)', { value: `%${searchDto.search.trim()}%` });
    }
    if (searchDto.active && searchDto.active != 'undefined') {
      query.andWhere("category.isActive = :isActive", { isActive: searchDto.active === 'true' ? true : false })
    }
    const itemCount = await query.getCount();
    query.skip((page - 1) * pageSize).take(pageSize);
    const data: Category[] = await query.getMany();
    const paging: PagingDto = new PagingDto(page, pageSize, itemCount)
    return new ResultDto(data, paging);
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<ResultDto<Category>> {
    const size: Category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    size.isActive = false;
    size.isDelete = true;
    const data: Category = await this.categoryRepository.save(size);
    return new ResultDto(data, null);
  }
}