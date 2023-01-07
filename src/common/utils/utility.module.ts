import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Module({
  // imports: [UserModule, ScheduleModule.forRoot()],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
