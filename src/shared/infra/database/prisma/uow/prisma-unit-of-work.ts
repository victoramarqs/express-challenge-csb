import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UnitOfWork,
  TransactionContext,
} from '@/shared/application/uow/unit-of-work';
import { PrismaTransactionContext } from '../types/prisma-tx-types';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private readonly prisma: PrismaService) {}
  runInTransaction<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(
      async (client) => {
        const ctx: PrismaTransactionContext = { client };
        return fn(ctx as unknown as TransactionContext);
      },
      { isolationLevel: 'Serializable' },
    );
  }
}
