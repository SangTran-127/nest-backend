import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  async validate({ username }: { username: string }): Promise<any> {
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
