import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../user/user.entity';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/services/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    JwtStrategy, 
    TokenService,
  ],
  exports: [TokenService],
})
export class AuthModule {}