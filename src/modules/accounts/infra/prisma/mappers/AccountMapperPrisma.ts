import { Account as RawAccount } from 'generated/prisma';
import { Account } from '@/modules/accounts/entities/Account';

export class AccountMapperPrisma {
  static toPrisma(account: Account) {
    return {
      id: account.id,
      accountNumberBase: account.accountNumberBase,
      balance: account.balance,
    };
  }

  static toDomain(raw: RawAccount): Account {
    return new Account(
      {
        accountNumberBase: raw.accountNumberBase,
        balance: Number(raw.balance),
      },
      raw.id,
    );
  }
}
