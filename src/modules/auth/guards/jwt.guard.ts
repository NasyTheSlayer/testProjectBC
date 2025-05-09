import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../services/token.service';
import { SKIP_AUTH } from '../constants/constants';
import { TokenType } from '../enums/token-type.enum';
  
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;
  
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] || request.get('Authorization');
    
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    
    const token = authHeader?.split('Bearer ')[1];
  
    if (!token) {
      throw new UnauthorizedException('Access token is required');
    }
  
    try {
      const payload = await this.tokenService.verifyToken(
        token,
        TokenType.ACCESS,
      );
      
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}