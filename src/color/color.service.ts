import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './color.entity';
import { CreateColorDto } from './dto/color.dto';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from './dto/SearchDto';
import { PagingDto } from 'src/dto/PagingDto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<ResultDto<Color>> {
    try {
      const color = new Color();
      color.title = createColorDto.title;
      color.value = createColorDto.value;
      const data: Color = await this.colorRepository.save(color);
      return new ResultDto(data, null, null);
    } catch (error) {
      if (error.code === "23505") {
        console.log(error)
      }
      return new ResultDto(null, null, 'color exist');
    }
  }

  async update(createColorDto: CreateColorDto): Promise<ResultDto<Color>> {
    const dataSave: Color = await this.colorRepository.findOne({
      where: { id: createColorDto.id }
    });
    if (!dataSave) {
      console.log('Color not found');
      return;
    }
    dataSave.title = createColorDto.title;
    dataSave.value = createColorDto.value;
    dataSave.isActive = createColorDto.isActive;
    const data: Color = await this.colorRepository.save(dataSave);
    return new ResultDto(data, null);
  }


  async findAll(searchDto: SearchDto, page: number, pageSize: number): Promise<ResultDto<Color>> {
    const query = this.colorRepository.createQueryBuilder('color')
      .where("color.isDelete = :isDelete", { isDelete: false })
    if (searchDto.search && searchDto.search != 'undefined') {
      query.andWhere('LOWER(color.title) LIKE LOWER(:title)', { title: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(color.value) LIKE LOWER(:value)', { value: `%${searchDto.search.trim()}%` });
    }
    if (searchDto.active && searchDto.active != 'undefined') {
      query.andWhere("color.isActive = :isActive", { isActive: searchDto.active === 'true' ? true : false })
    }
    const itemCount = await query.getCount();
    query.skip((page - 1) * pageSize).take(pageSize);
    const data: Color[] = await query.getMany();
    const paging: PagingDto = new PagingDto(page, pageSize, itemCount)
    return new ResultDto(data, paging);
  }

  findOne(id: number): Promise<Color> {
    return this.colorRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<ResultDto<Color>> {
    const size: Color = await this.colorRepository.findOne({
      where: { id: id },
    });
    size.isActive = false;
    size.isDelete = true;
    const data: Color = await this.colorRepository.save(size);
    return new ResultDto(data, null);
  }
}