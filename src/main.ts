import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupCors } from './setup-cors';
import { AppModule } from './app.module';
import { AppConfig } from './configs/configs.type';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  
  setupCors(app);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
  });
}
void bootstrap();