import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EQueue } from 'src/common/constants/queue';

@Processor(EQueue.User)
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  @Process()
  handleTranscode(job: Job) {
    this.logger.log('Start transcoding...');
    this.logger.log(job.data);
    this.logger.log('Transcoding completed');
  }
}
