import { Injectable } from '@nestjs/common';
import { Account } from '@/modules/accounts/entities/Account';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { AccountMapperPrisma } from '../mappers/AccountMapperPrisma';
import { TransactionContext } from '@/shared/application/uow/unit-of-work';
import { PrismaTransactionContext } from '@/shared/infra/database/prisma/types/prisma-tx-types';

@Injectable()
export class AccountsRepositoryPrisma implements IAccountRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    return AccountMapperPrisma.toDomain(account);
  }

  async findByNumber(accountNumberBase: number): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { accountNumberBase },
    });

    return AccountMapperPrisma.toDomain(account);
  }

  async create(account: Account, tx: TransactionContext): Promise<Account> {
    const raw = AccountMapperPrisma.toPrisma(account);
    const { client } = tx as PrismaTransactionContext;

    const newAccount = await client.account.create({
      data: raw,
    });

    return AccountMapperPrisma.toDomain(newAccount);
  }

  async updateDv(
    id: string,
    dv: string,
    tx: TransactionContext,
  ): Promise<void> {
    const { client } = tx as PrismaTransactionContext;
    await client.account.update({
      where: { id },
      data: { accountDV: dv },
    });
  }
}
