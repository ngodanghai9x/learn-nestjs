import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EQueue } from 'src/common/constants/queue';
import { sleep } from 'src/common/utils/sleep';

@Processor(EQueue.User)
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  @Process()
  async handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.loop(() => {
      this.logger.debug(job.data);
      this.logger.debug('Transcoding completed');
    });
  }

  async loop(cb = () => null) {
    while (true) {
      const random = Math.random();
      console.log('🚀 ~ random:', random);
      await sleep(1234);

      if (random > 0.91) {
        return cb();
      }
    }
  }
}
