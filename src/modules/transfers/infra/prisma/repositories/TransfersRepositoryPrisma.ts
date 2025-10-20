import { Transfer } from '@/modules/transfers/entities/Transfer';
import { ITransferRepository } from '@/modules/transfers/repositories/ITransferRepository';
import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { PrismaTransactionContext } from '@/shared/infra/database/prisma/types/prisma-tx-types';
import { Injectable } from '@nestjs/common';
import { TransferMapperPrisma } from '../mappers/TransferMapperPrisma';

@Injectable()
export class TransfersRepositoryPrisma implements ITransferRepository {
  constructor(private readonly prisma: PrismaService) {}

  private orm(tx?: TransactionContext) {
    return tx ? (tx as PrismaTransactionContext).client : this.prisma;
  }

  async findByTransactionId(
    tid: string,
    tx: TransactionContext,
  ): Promise<Transfer | null> {
    const transfer = await this.orm(tx).transfer.findUnique({
      where: { transactionId: tid },
    });

    if (!transfer) return null;

    return TransferMapperPrisma.toDomain(transfer);
  }

  async create(transfer: Transfer, tx: TransactionContext): Promise<Transfer> {
    const raw = TransferMapperPrisma.toPrisma(transfer);

    const newTransfer = await this.orm(tx).transfer.create({
      data: raw,
    });

    return TransferMapperPrisma.toDomain(newTransfer);
  }
}
