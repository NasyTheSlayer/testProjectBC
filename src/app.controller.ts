import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'Welcome to Test Project Backend!';
  }

  @Get('health')
  getHealth(): string {
    return 'OK';
  }
}