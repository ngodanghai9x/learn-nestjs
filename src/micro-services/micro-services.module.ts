import { Module } from '@nestjs/common';
import { EmailSvModule } from './email-sv/email-sv.module';

@Module({
  imports: [EmailSvModule],
  exports: [EmailSvModule],
})
export class MicroServicesModule {}
