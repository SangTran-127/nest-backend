import { User, UserDocument } from './../common/schemas/user.schema';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenReposity } from 'src/common/repository/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenReposity,
  ) {}

  async validateUser(username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    return user;
  }
  async login(userDTO: LoginUserDto) {
    const user = (await this.usersService.findByLogin(userDTO)) as User;
    const token = await this._generateToken(user);
    // const { refreshToken } = token;
    // const _refreshToken = await this.refreshTokenRepository.findByCondition({
    //   refreshToken: { $eq: refreshToken },
    // });
    // console.log(user.username);
    // await this.usersService.addRefreshToken(user.username, _refreshToken);
    return {
      user,
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
  async refreshTokenRequest(refreshToken: string) {
    const decodeToken = await this.validateRefreshToken(refreshToken);
    if (!decodeToken) {
      throw new HttpException(
        `Invalid or expired refresh token`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { user } = await this.usersService.findUserByRefreshToken(
      refreshToken,
    );
    const newToken = await this._generateToken(user, false);
    return {
      username: user.username,
      ...newToken,
      refreshToken,
    };
  }
  async validateRefreshToken(refreshToken: string) {
    const refreshTokenExisted =
      await this.refreshTokenRepository.findByCondition({
        refreshToken,
      });

    if (!refreshTokenExisted) return null;

    const decodedToken = await this.jwtService.verify(refreshToken, {
      secret: `${process.env.JWT_SECRET_KEY_REFRESH}`,
    });
    console.log(decodedToken);
    if (!decodedToken) return null;
    if (refreshTokenExisted.expiryDate < new Date()) {
      await refreshTokenExisted.remove();
      return null;
    }
    return decodedToken;
  }
  async createRefreshToken(user: User) {
    const refreshToken = this.jwtService.sign(
      {
        username: user.username,
      },
      {
        secret: `${process.env.JWT_SECRET_KEY_REFRESH}`,
        expiresIn: `${process.env.EXPIRES_REFRESH_TOKEN}`,
      },
    );
    // 7 means 7day
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const _refreshToken = await this.refreshTokenRepository.create({
      refreshToken,
      expiryDate,
      user,
    });
    return _refreshToken.refreshToken;
  }
  private async _generateToken(user: User, refresh = true) {
    const { username } = user;
    const accessToken = this.jwtService.sign({
      username,
    });
    if (refresh) {
      const refreshToken = await this.createRefreshToken(user);
      return {
        expiresIn: `${process.env.EXPIRES_TOKEN}`,
        accessToken,
        refreshToken,
        expireInRefresh: `${process.env.EXPIRES_REFRESH_TOKEN}`,
      };
    }
    return {
      expiresIn: `${process.env.EXPIRES_TOKEN}`,
      accessToken,
    };
  }
  async logout(user: UserDocument) {
    const refreshToken = await this.refreshTokenRepository.findByCondition({
      user: user._id,
    });
    await refreshToken.delete();
  }
}
