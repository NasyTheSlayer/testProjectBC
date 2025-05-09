import { Controller, Get } from '@nestjs/common';
import { SkipAuth } from './modules/auth/decorators/skip-auth.decorator';

@Controller('/')
export class AppController {
  @SkipAuth()
  @Get()
  getRoot(): string {
    return 'Welcome to Test Project Backend!';
  }

  @SkipAuth()
  @Get('health')
  getHealth(): string {
    return 'OK';
  }
}