import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { JwtService } from '@nestjs/jwt';
import { encrypted, decrypted } from 'src/utils/crypto';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.fullName = createUserDto.fullName;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.userName = createUserDto.userName;
    const hash = await encrypted(createUserDto.password);
    user.password = hash;
    await this.usersRepository.save(user);
    const payload = { userName: user.userName, id: user.id, email: user.email, phone: user.phone, fullName: user.fullName };
     return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findByUsername(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName: userName });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
