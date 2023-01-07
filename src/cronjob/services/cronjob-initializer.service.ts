import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { CronjobService } from './cronjob.service';

@Injectable()
export class CronjobInitializerService implements OnModuleInit {
  private logger = new Logger(CronjobInitializerService.name);
  constructor(
    private readonly cronjobService: CronjobService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    this.logger.log('Cronjob scheduler has been initialized.');

    await this.userService.initQueue();
    await this.userService.initRoles();
    await this.userService.initUser();
    await this.cronjobService.startCronJob({
      jobName: 'MyJob123',
      scheduleTime: '*/30 * * * * *',
    });
  }
}
