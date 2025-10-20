import IORedis from 'ioredis';
import Redlock, { type Lock } from 'redlock';
import { Injectable } from '@nestjs/common';

export type WithLocksOptions = {
  ttlMs?: number; // tempo do lock (por chamada)
};

@Injectable()
export class LockService {
  constructor(
    private readonly redis: IORedis, // injetado pelo módulo
    private readonly redlock: Redlock, // injetado pelo módulo
  ) {}

  /** Normaliza/ordena para evitar deadlock por ordem diferente de aquisição */
  private normalize(keys: string[] | string): string[] {
    const arr = Array.isArray(keys) ? keys : [keys];
    return [...new Set(arr)].sort();
  }

  async withLocks<T>(
    keys: string[] | string,
    fn: () => Promise<T>,
    opts: WithLocksOptions = {},
  ): Promise<T> {
    const { ttlMs = 3000 } = opts;

    const identifiers = this.normalize(keys).map((k) => `lock:${k}`);
    const locks: Lock[] = [];

    try {
      for (const id of identifiers) {
        locks.push(await this.redlock.acquire([id], ttlMs));
      }
      return await fn();
    } finally {
      for (const lock of locks.reverse()) {
        try {
          await lock.release();
        } catch {}
      }
    }
  }
}
