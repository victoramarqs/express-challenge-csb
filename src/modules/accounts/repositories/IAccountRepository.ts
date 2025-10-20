import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { Account } from '../entities/Account';

export abstract class IAccountRepository {
  abstract findById(
    id: string,
    tx?: TransactionContext,
  ): Promise<Account | null>;
  abstract findByNumber(accountNumberBase: number): Promise<Account | null>;
  abstract create(account: Account): Promise<Account>;
  abstract debitIfEnough(
    id: string,
    amount: number,
    tx: TransactionContext,
  ): Promise<boolean>;
  abstract credit(
    id: string,
    amount: number,
    tx: TransactionContext,
  ): Promise<void>;
}
