import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { CronjobService } from './cronjob.service';
import { UtilityService } from 'src/common/utils/utility.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CronjobInitializerService implements OnModuleInit {
  private logger = new Logger(CronjobInitializerService.name);
  constructor(
    private readonly cronjobService: CronjobService,
    private readonly userService: UserService,
    private readonly utilityService: UtilityService,
    private readonly commonService: CommonService,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Cronjob scheduler has been initialized.');
      await this.userService.initQueue();
      await this.userService.initRoles();
      await this.userService.initUser();
      await this.cronjobService.startCronJob({
        jobName: 'MyJob123',
        // scheduleTime: '*/30 * * * * *',
      });
      await this.utilityService.sleep(1234, true);
      this.commonService.doNothing();
      // this.listenSse();
    } catch (error) {
      this.logger.error('Cronjob scheduler has FAIL while initializing.');
    }
  }

  /** @deprecated EventSource only exist on browser env */
  listenSse() {
    const eventSource = new EventSource('http://localhost:3005/notification/high-level');
    eventSource.onmessage = (e) => {
      console.log('e', e);
      this.logger.log('New message', JSON.parse(e?.data));
    };
  }
}
