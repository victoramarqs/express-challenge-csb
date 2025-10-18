import { Injectable } from '@nestjs/common';
import { Account } from '@/modules/accounts/entities/Account';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { AccountMapperPrisma } from '../mappers/AccountMapperPrisma';

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

  async create(account: Account): Promise<Account> {
    const raw = AccountMapperPrisma.toPrisma(account);

    const newAccount = await this.prisma.account.create({
      data: raw,
    });

    return AccountMapperPrisma.toDomain(newAccount);
  }
}
