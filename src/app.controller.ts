import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MyForbiddenException } from './common/exceptions/forbidden.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('testFilter')
  // @UseFilters(HttpExceptionFilter)
  async testFilter() {
    throw new Error(`123Error`);
    // throw new MyForbiddenException();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
