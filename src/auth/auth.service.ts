import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    return user;
  }
  async login(userDTO: LoginUserDto) {
    const user = await this.usersService.findByLogin(userDTO);
    const token = this._generateToken(user);
    return {
      username: user.username,
      ...token,
    };
  }
  async register(userDTO: CreateUserDto) {
    const user = await this.usersService.create(userDTO);
    const token = await this._generateToken(user);
    return {
      username: user.username,
      ...token,
    };
  }
  private async _generateToken({ username }) {
    const accessToken = this.jwtService.sign({
      username,
    });
    return {
      expiresIn: `${process.env.EXPIRES_TOKEN}`,
      accessToken,
    };
  }
}
