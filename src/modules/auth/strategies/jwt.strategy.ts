import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTConfig } from 'src/configs/configs.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JWTConfig>('jwt').accessSecret,
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.id || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }
    
    return { id: payload.id, email: payload.email };
  }
}