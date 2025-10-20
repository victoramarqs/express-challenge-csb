import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { Transfer } from '../../entities/Transfer';
import { ITransferRepository } from '../ITransferRepository';

export class TransfersRepositoryInMemory implements ITransferRepository {
  transfers: Transfer[];

  async findByTransactionId(
    tid: string,
    _tx: TransactionContext,
  ): Promise<Transfer | null> {
    return this.transfers.find((transfer) => {
      transfer.transactionId === tid;
    });
  }

  async create(transfer: Transfer, _tx: TransactionContext): Promise<Transfer> {
    this.transfers.push(transfer);
    return transfer;
  }
}
