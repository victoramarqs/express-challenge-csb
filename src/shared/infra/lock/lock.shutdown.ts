import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import type IORedis from 'ioredis';
import { REDIS } from './lock.tokens';

@Injectable()
export class LockModuleShutdown implements OnApplicationShutdown {
  constructor(@Inject(REDIS) private readonly redis: IORedis) {}

  async onApplicationShutdown() {
    try {
      await this.redis.quit();
    } catch {
      // silencia erro de shutdown
    }
  }
}
