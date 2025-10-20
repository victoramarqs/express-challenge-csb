import { Transfer as RawTransfer } from 'generated/prisma';
import { Transfer } from '@/modules/transfers/entities/Transfer';

export class TransferMapperPrisma {
  static toPrisma(transfer: Transfer) {
    return {
      id: transfer.id,
      transactionId: transfer.transactionId,
      fromAccountId: transfer.fromAccountId,
      toAccountId: transfer.toAccountId,
      amount: Number(transfer.amount),
    };
  }

  static toDomain(raw: RawTransfer): Transfer {
    return new Transfer(
      {
        transactionId: raw.transactionId,
        fromAccountId: raw.fromAccountId,
        toAccountId: raw.toAccountId,
        amount: Number(raw.amount),
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
