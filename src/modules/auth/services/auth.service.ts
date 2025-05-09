import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { AuthReqDto } from '../dto/req/auth.req.dto';
import { ApiResponse } from 'src/common/responses/api-response';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { RefreshTokenReqDto } from '../dto/req/refresh-token.req.dto';
import { RefreshTokenResDto } from '../dto/res/refresh-token.res.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { ConfigService } from '@nestjs/config';
import { JWTConfig } from 'src/configs/configs.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenSerice: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: AuthReqDto): Promise<ApiResponse<AuthResDto>> {
    const { email, password } = dto;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      email: email,
      password: hashedPassword,
    });

    const payload = {
      id: user.id,
      email: user.email,
    };

    const tokens = this.tokenSerice.getTokens(payload);

    return ApiResponse.success({
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      },
      user: {
        id: user.id,
        email: user.email
      }
    }, 'Registration successful');
  }

  async login(dto: AuthReqDto): Promise<ApiResponse<AuthResDto>> {
    const { email, password } = dto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const tokens = this.tokenSerice.getTokens(payload);
    
    return ApiResponse.success({
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      },
      user: {
        id: user.id,
        email: user.email
      }
    }, 'Login successful');
  }

  async refresh(dto: RefreshTokenReqDto): Promise<ApiResponse<RefreshTokenResDto>> {
    try {
      const jwtConfig = this.configService.get<JWTConfig>('jwt');
      const payload = this.jwtService.verify(dto.refresh_token, {
        secret: jwtConfig.refreshSecret
      });
      
      const access_token = this.tokenSerice.getToken(
        { id: payload.id, email: payload.email }, 
        jwtConfig.accessSecret, 
        jwtConfig.accessExpiresIn
      );
      
      return ApiResponse.success({ 
        accessToken: access_token,
      }, 'Tokens refreshed successfully');
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}