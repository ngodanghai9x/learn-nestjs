import { Controller, Get } from '@nestjs/common';
import { EmailSvService } from './email-sv.service';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('micro-services')
@Controller('micro-sv/email')
export class EmailSvController {
  constructor(private readonly emailSvService: EmailSvService) {}
  @Get()
  getHello(): string {
    return EmailSvController.name;
  }
}
