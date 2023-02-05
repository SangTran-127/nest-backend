import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Body, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return await this.authService.refreshTokenRequest(refreshToken);
  }
}
