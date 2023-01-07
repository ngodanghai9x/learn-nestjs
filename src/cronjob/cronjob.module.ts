import { Module } from '@nestjs/common';
import { CronjobService } from './services/cronjob.service';
import { CronjobController } from './cronjob.controller';
import { CronjobInitializerService } from './services/cronjob-initializer.service';
import { UserModule } from 'src/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [UserModule, ScheduleModule.forRoot()],
  controllers: [CronjobController],
  providers: [CronjobService, CronjobInitializerService],
})
export class CronjobModule {}
