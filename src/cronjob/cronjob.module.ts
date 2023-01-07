import { Module } from '@nestjs/common';
import { CronjobService } from './services/cronjob.service';
import { CronjobController } from './cronjob.controller';
import { CronjobInitializerService } from './services/cronjob-initializer.service';
import { UserModule } from 'src/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UtilityModule } from 'src/common/utils/utility.module';
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [
    UserModule,
    // UtilityModule,
    CommonModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [CronjobController],
  providers: [CronjobService, CronjobInitializerService],
})
export class CronjobModule {}
