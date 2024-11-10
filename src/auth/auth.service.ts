import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { decrypted } from 'src/utils/crypto';
import { ResultDto } from 'src/dto/ResultDto';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string): Promise<ResultDto<User>> {
    const user = await this.usersService.findByUsername(userName);
    if (!user) {
      return new ResultDto(null, null, 'account not exist');
    }
    const hash = await decrypted(user.password);
    if (hash !== pass) {
      return new ResultDto(null, null, 'wrong password');
    }
    const payload = {
      userName: user.userName,
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      roles: user.roles
    };
    return new ResultDto(user, null, await this.jwtService.signAsync(payload));
  }
}