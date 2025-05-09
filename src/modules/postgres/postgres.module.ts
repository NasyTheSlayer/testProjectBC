import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './postgres-connect.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSource.options,
        autoLoadEntities: true,
        seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
        factories: [__dirname + '/factories/**/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + '/migrations/',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class PostgresModule {}
