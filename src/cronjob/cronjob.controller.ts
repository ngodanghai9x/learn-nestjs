import { Controller } from '@nestjs/common';
import { CronjobService } from './services/cronjob.service';

@Controller('cronjob')
export class CronjobController {
  constructor(private readonly cronjobService: CronjobService) {}
}
