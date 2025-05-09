import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '../enums/token-type.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ITokenPair } from '../interfaces/token-pair.interface';
import { ConfigService } from '@nestjs/config';
import { JWTConfig } from 'src/configs/configs.type';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async verifyToken(
    token: string,
    type: TokenType,
  ) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch (error) {
      Logger.error('Token verification error', error);
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw new UnauthorizedException('Token verification failed');
    }
  }

  private getSecret(type: TokenType): string {
    const jwtConfig = this.configService.get<JWTConfig>('jwt');
    let secret: string;
    switch (type) {
      case TokenType.ACCESS:
        secret = jwtConfig.accessSecret;
        break;
      case TokenType.REFRESH:
        secret = jwtConfig.refreshSecret;
        break;
      default:
        throw new BadRequestException('Unknown token type');
    }
    return secret;
  }

  public getTokens(payload: JwtPayload): ITokenPair {
    const jwtConfig = this.configService.get<JWTConfig>('jwt');
    const access_token = this.getToken(
      payload,
      jwtConfig.accessSecret,
      jwtConfig.accessExpiresIn,
    );
    const refresh_token = this.getToken(
      payload,
      jwtConfig.refreshSecret,
      jwtConfig.refreshExpiresIn,
    );
    return { access_token, refresh_token };
  }

  public getToken(payload: JwtPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}