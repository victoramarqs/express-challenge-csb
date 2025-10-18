import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUnitOfWork } from './uow/prisma-unit-of-work';
import { UNIT_OF_WORK } from '@/shared/application/uow/unit-of-work';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import { AccountsRepositoryPrisma } from '@/modules/accounts/infra/prisma/repositories/AccountsRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    { provide: UNIT_OF_WORK, useClass: PrismaUnitOfWork },
    { provide: IAccountRepository, useClass: AccountsRepositoryPrisma },
  ],
  exports: [PrismaService, UNIT_OF_WORK, IAccountRepository],
})
export class PrismaModule {}
