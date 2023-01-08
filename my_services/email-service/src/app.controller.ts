import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'send_email' })
  sendEmail(@Payload() payload: object): string {
    const output = `[Req & Res] Input: ${payload} => Output: ${JSON.stringify(
      payload,
    )}`;
    this.logger.log(output);
    return output;
  }

  // @EventPattern({ cmd: 'send_email' })
  @EventPattern('send_email')
  handleSendMailEvent(payload: object): string {
    const output = `[Event handler] Input: ${payload} => Output: ${JSON.stringify(
      payload,
    )}`;
    this.logger.log(output);
    return output;
  }
}
