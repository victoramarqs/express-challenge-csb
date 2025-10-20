import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { Transfer } from '../entities/Transfer';

export abstract class ITransferRepository {
  abstract findByTransactionId(
    tid: string,
    tx: TransactionContext,
  ): Promise<Transfer | null>;
  abstract create(
    transfer: Transfer,
    tx: TransactionContext,
  ): Promise<Transfer>;
}
