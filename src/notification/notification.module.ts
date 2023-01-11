import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './notification.controller';
import { UtilityModule } from 'src/common/utils/utility.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [UtilityModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
