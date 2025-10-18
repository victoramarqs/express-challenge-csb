import {
  UnitOfWork,
  TransactionContext,
} from '@/shared/application/uow/unit-of-work';

class InMemoryTx implements TransactionContext {}
export class InMemoryUnitOfWork implements UnitOfWork {
  async runInTransaction<T>(
    fn: (tx: TransactionContext) => Promise<T>,
  ): Promise<T> {
    return fn(new InMemoryTx());
  }
}
