import configs from './configs/configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './modules/postgres/postgres.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TrainModule } from './modules/train/train.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    PostgresModule,
    AuthModule,
    UserModule,
    TrainModule,
  ],
})
export class AppModule {}