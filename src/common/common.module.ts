import { Module } from '@nestjs/common';
import { UtilityModule } from './utils/utility.module';
import { CommonService } from './common.service';

@Module({
  imports: [UtilityModule],
  providers: [CommonService],
  exports: [UtilityModule, CommonService],
})
export class CommonModule {}
