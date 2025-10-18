import { Account } from '../../entities/Account';
import { IAccountRepository } from '../IAccountRepository';

export class AccountsRepositoryInMemory implements IAccountRepository {
  accounts: Account[] = [];
  private counter = 1;

  async findById(id: string): Promise<Account | null> {
    return this.accounts.find((account) => account.id === id) ?? null;
  }

  async findByNumber(accountNumberBase: number): Promise<Account | null> {
    return (
      this.accounts.find(
        (account) => account.accountNumberBase === accountNumberBase,
      ) ?? null
    );
  }

  async create(account: Account): Promise<Account> {
    // simula autoincrement do banco
    account.accountNumberBase = this.counter++;
    this.accounts.push(account);
    return account;
  }
}
