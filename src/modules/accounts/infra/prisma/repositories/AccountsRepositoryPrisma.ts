import { Injectable } from '@nestjs/common';
import { Account } from '@/modules/accounts/entities/Account';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { AccountMapperPrisma } from '../mappers/AccountMapperPrisma';
import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { PrismaTransactionContext } from '@/shared/infra/database/prisma/types/prisma-tx-types';

@Injectable()
export class AccountsRepositoryPrisma implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  private orm(tx?: TransactionContext) {
    return tx ? (tx as PrismaTransactionContext).client : this.prisma;
  }

  async findById(id: string, tx?: TransactionContext): Promise<Account | null> {
    const account = await this.orm(tx).account.findUnique({
      where: { id },
    });

    if (!account) return null;

    return AccountMapperPrisma.toDomain(account);
  }

  async findByNumber(accountNumberBase: number): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { accountNumberBase },
    });

    if (!account) return null;

    return AccountMapperPrisma.toDomain(account);
  }

  async create(account: Account): Promise<Account> {
    const raw = AccountMapperPrisma.toPrisma(account);

    const newAccount = await this.prisma.account.create({
      data: raw,
    });

    return AccountMapperPrisma.toDomain(newAccount);
  }

  async debitIfEnough(
    id: string,
    amount: number,
    tx: TransactionContext,
  ): Promise<boolean> {
    const res = await this.orm(tx).account.updateMany({
      where: { id, balance: { gte: amount } },
      data: { balance: { decrement: amount } },
    });
    return res.count > 0;
  }

  async credit(
    id: string,
    amount: number,
    tx: TransactionContext,
  ): Promise<void> {
    await this.orm(tx).account.update({
      where: { id },
      data: { balance: { increment: amount } },
    });
  }
}
