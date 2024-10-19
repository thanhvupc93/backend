import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { decrypted, encrypted } from 'src/utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string) {
    const user = await this.usersService.findByUsername(userName);
    const hash = await decrypted(user.password);
    if (hash !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userName: user.userName, id: user.id , email: user.email, phone: user.phone, fullName: user.fullName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}