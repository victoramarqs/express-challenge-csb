import { Account } from '../entities/Account';

export abstract class IAccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByNumber(accountNumberBase: number): Promise<Account | null>;
  abstract create(account: Account): Promise<Account>;
}
