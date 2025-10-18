import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { Account } from '../entities/Account';

export abstract class IAccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByNumber(accountNumberBase: number): Promise<Account | null>;
  abstract create(account: Account, tx: TransactionContext): Promise<Account>;
  abstract updateDv(
    id: string,
    dv: string,
    tx: TransactionContext,
  ): Promise<void>;
}
