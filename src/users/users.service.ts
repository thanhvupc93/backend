import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { JwtService } from '@nestjs/jwt';
import { encrypted } from 'src/utils/crypto';
import { ResultDto } from 'src/dto/ResultDto';
import { SearchDto } from './dto/SearchDto';
import { PagingDto } from 'src/dto/PagingDto';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<ResultDto<User>> {
    try {
      const user = new User();
      user.fullName = createUserDto.fullName;
      user.email = createUserDto.email;
      user.phone = createUserDto.phone;
      user.userName = createUserDto.userName;
      const hash = await encrypted(createUserDto.password);
      user.password = hash;

      const roles = await this.roleRepository.find({
        where: {
          id: In(createUserDto.roleIds), // Using the 'In' operator to filter by multiple IDs
        },
      });
      user.roles = roles;
      const data: User = await this.usersRepository.save(user);
      const payload = { userName: user.userName, id: user.id, email: user.email, phone: user.phone, fullName: user.fullName };
      const access_token = await this.jwtService.signAsync(payload);
      return new ResultDto(data, null, access_token);
    } catch (error) {
      if (error.code === "23505") {
        console.log(error)
      }
      return new ResultDto(null, null, 'account exist');
    }
  }

  async update(createUserDto: CreateUserDto): Promise<ResultDto<User>> {
    const user: User = await this.usersRepository.findOne({
      where: { id: createUserDto.id },
      relations: {
        roles: true
      }
    });
    if (!user) {
      console.log('User not found');
      return;
    }
    user.fullName = createUserDto.fullName;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.userName = createUserDto.userName;
    user.isActive = createUserDto.isActive;
    if (user.password != createUserDto.password) {
      const hash = await encrypted(createUserDto.password);
      user.password = hash;
    } else {
      user.password = createUserDto.password
    }

    const roles = await this.roleRepository.find({
      where: {
        id: In(createUserDto.roleIds), // Using the 'In' operator to filter by multiple IDs
      },
    });
    user.roles = roles;
    delete createUserDto.roleIds;
    const data: User = await this.usersRepository.save(user);
    return new ResultDto(data, null);
  }

  async findAll(searchDto: SearchDto, page: number, pageSize: number): Promise<ResultDto<User>> {
    const query = this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect("user.roles", "roles")
      .where("user.isDelete = :isDelete", { isDelete: false })
    if (searchDto.search && searchDto.search != 'undefined') {
      query.andWhere('LOWER(user.userName) LIKE LOWER(:userName)', { userName: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(user.email) LIKE LOWER(:email)', { email: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(user.phone) LIKE LOWER(:phone)', { phone: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(user.fullName) LIKE LOWER(:fullName)', { fullName: `%${searchDto.search.trim()}%` });
      query.orWhere('LOWER(roles.name) LIKE LOWER(:roleName)', { roleName: `%${searchDto.search.trim()}%` });
    }
    if (searchDto.active && searchDto.active != 'undefined') {
      query.andWhere("user.isActive = :isActive", { isActive: searchDto.active === 'true' ? true : false })
    }


    const itemCount = await query.getCount();
    query.skip((page - 1) * pageSize).take(pageSize);
    const data: User[] = await query.getMany();
    const paging: PagingDto = new PagingDto(page, pageSize, itemCount)
    return new ResultDto(data, paging);

  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: {
        roles: true
      }
    });
  }

  async findByUsername(userName: string): Promise<User> {
    const data: User = await this.usersRepository.findOne({
      where: { userName: userName },
      relations: {
        roles: true
      }
    });
    return data;
  }

  async remove(id: number): Promise<ResultDto<User>> {
    const user: User = await this.usersRepository.findOne({
      where: { id: id },
    });
    user.isActive = false;
    user.isDelete = true;
    const data: User = await this.usersRepository.save(user);
    return new ResultDto(data, null);
  }
}
