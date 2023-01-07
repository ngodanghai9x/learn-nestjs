import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommonService {
  private readonly logger = new Logger(CommonService.name);

  doNothing() {
    this.logger.log('do nothing');
  }
}
