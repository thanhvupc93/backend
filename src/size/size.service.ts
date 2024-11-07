import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './size.entity';
import { CreateSizeDto } from './dto/size.dto';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from 'src/size/dto/SearchDto';
import { PagingDto } from 'src/dto/PagingDto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<ResultDto<Size>> {
    try {
    const category = new Size();
    category.title = createSizeDto.title;
    category.value = createSizeDto.value;
      const data: Size = await this.sizeRepository.save(category);
      return new ResultDto(data, null, null);
    } catch (error) {
      if (error.code === "23505") {
        console.log(error)
      }
      return new ResultDto(null, null, 'size exist');
    }
  }

  async update(createSizeDto: CreateSizeDto): Promise<ResultDto<Size>> {
    const dataSave: Size = await this.sizeRepository.findOne({
      where: { id: createSizeDto.id }
    });
    if (!dataSave) {
      console.log('Size not found');
      return;
    }
    dataSave.title = createSizeDto.title;
    dataSave.value = createSizeDto.value;
    dataSave.isActive = createSizeDto.isActive;
    const data: Size = await this.sizeRepository.save(dataSave);
    return new ResultDto(data, null);
  }

  async findAll(searchDto: SearchDto, page: number, pageSize: number): Promise<ResultDto<Size>> {
    const query = this.sizeRepository.createQueryBuilder('size')
      .where("size.isDelete = :isDelete", { isDelete: false })
    if (searchDto.search && searchDto.search != 'undefined') {
      query.andWhere('LOWER(size.title) LIKE LOWER(:title)', { title: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(size.value) LIKE LOWER(:value)', { value: `%${searchDto.search.trim()}%` });
    }
    if (searchDto.active && searchDto.active != 'undefined') {
      query.andWhere("size.isActive = :isActive", { isActive: searchDto.active === 'true' ? true : false })
    }
    const itemCount = await query.getCount();
    query.skip((page - 1) * pageSize).take(pageSize);
    const data: Size[] = await query.getMany();
    const paging: PagingDto = new PagingDto(page, pageSize, itemCount)
    return new ResultDto(data, paging);
  }

  findOne(id: number): Promise<Size> {
    return this.sizeRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<ResultDto<Size>> {
    const size: Size = await this.sizeRepository.findOne({
      where: { id: id },
    });
    size.isActive = false;
    size.isDelete = true;
    const data: Size = await this.sizeRepository.save(size);
    return new ResultDto(data, null);
  }
}