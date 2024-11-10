import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ResultDto } from 'src/dto/ResultDto';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>): Promise<ResultDto<User>> {
    try {
      const data = await this.authService.signIn(signInDto.userName, signInDto.password);
      if (data) {
        return data
      }
    } catch (error) {
      console.log(error)
      throw Error();
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}