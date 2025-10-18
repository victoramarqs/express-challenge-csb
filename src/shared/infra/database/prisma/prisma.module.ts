import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import { AccountsRepositoryPrisma } from '@/modules/accounts/infra/prisma/repositories/AccountsRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    { provide: IAccountRepository, useClass: AccountsRepositoryPrisma },
  ],
  exports: [PrismaService, IAccountRepository],
})
export class PrismaModule {}
