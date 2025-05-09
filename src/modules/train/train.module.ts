import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './train.entity';
import { TrainService } from './services/train.service';
import { TrainController } from './train.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Train]),
    AuthModule,
  ],
  providers: [
    TrainService, 
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
],
  controllers: [TrainController],
})
export class TrainModule {}