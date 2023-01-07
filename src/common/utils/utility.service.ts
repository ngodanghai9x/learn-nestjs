import { Injectable, Logger } from '@nestjs/common';
import { sleep as _sleep } from './sleep';
import { retryPromise as _retryPromise } from './promise';

@Injectable()
export class UtilityService {
  private readonly logger = new Logger(UtilityService.name);

  async sleep(ms: number, needCalculate: boolean = false): Promise<unknown> {
    needCalculate && console.time(`sleepTime`);
    const res = await _sleep(ms);
    needCalculate && console.timeEnd(`sleepTime`);

    return res;
  }

  retryPromise<T>(
    promise: (...args: unknown[]) => Promise<T>,
    maxTry: number,
    delayTime: number,
  ): Promise<unknown> {
    return _retryPromise<T>(promise, maxTry, delayTime);
  }
}
