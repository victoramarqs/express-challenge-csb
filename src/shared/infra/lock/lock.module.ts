import { Module } from '@nestjs/common';
import IORedis from 'ioredis';
import Redlock from 'redlock';
import { REDIS, REDLOCK } from './lock.tokens';
import { LockService } from './lock.service';
import { LockModuleShutdown } from './lock.shutdown';

@Module({
  providers: [
    // Redis (singleton)
    {
      provide: REDIS,
      useFactory: () => {
        const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
        // Config amigável a Render/Upstash/Redis Cloud:
        const isTls = url.startsWith('rediss://');
        const client = new IORedis(url, {
          maxRetriesPerRequest: null,
          enableReadyCheck: true,
          // Em provedores gerenciados com TLS (URL rediss://) ative TLS:
          ...(isTls ? { tls: {} } : {}),
        });
        return client;
      },
    },
    // Redlock
    {
      provide: REDLOCK,
      inject: [REDIS],
      useFactory: (redis: IORedis) =>
        new Redlock([redis], {
          driftFactor: 0.01,
          retryCount: 10,
          // retryDelay: 50,
          retryDelay: 200,
          // retryJitter: 50,
          retryJitter: 200,
          // automaticExtensionThreshold: 0,
          automaticExtensionThreshold: 500,
        }),
    },
    // LockService
    {
      provide: LockService,
      inject: [REDIS, REDLOCK],
      useFactory: (redis: IORedis, redlock: Redlock) =>
        new LockService(redis, redlock),
    },
    // Classe de shutdown
    LockModuleShutdown,
  ],
  exports: [LockService],
})
export class LockModule {}
