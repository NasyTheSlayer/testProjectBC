import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
  ],
  exports: [UserService],
})
export class UserModule {}