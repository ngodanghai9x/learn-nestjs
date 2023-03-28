import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { RedisKey } from 'ioredis';
@Injectable()
export class CommonService {
  private readonly logger = new Logger(CommonService.name);
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  doNothing() {
    this.logger.log('do nothing');
  }

  async testCache() {
    await this.setCache('temp1', 'value cache', 5000);
    await this.getCache('temp1').then(console.warn);
  }

  setCache(key: RedisKey, value: string | Buffer | number, seconds: number | string) {
    return this.redis.set(key, value, 'EX', seconds);
  }

  getCache<T>(key: RedisKey) {
    return this.redis.get(key) as Promise<T>;
  }

  delCache(key: RedisKey) {
    return this.redis.del(key);
  }
}
