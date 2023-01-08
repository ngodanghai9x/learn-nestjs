import { Controller } from '@nestjs/common';
import { EmailSvService } from './email-sv.service';

@Controller()
export class EmailSvController {
  constructor(private readonly emailSvService: EmailSvService) {}
}
