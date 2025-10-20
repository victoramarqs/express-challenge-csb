import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import { AccountsRepositoryPrisma } from '@/modules/accounts/infra/prisma/repositories/AccountsRepositoryPrisma';
import { UNIT_OF_WORK } from '@/shared/application/uow/unit-of-work';
import { PrismaUnitOfWork } from './uow/prisma-unit-of-work';
import { ITransferRepository } from '@/modules/transfers/repositories/ITransferRepository';
import { TransfersRepositoryPrisma } from '@/modules/transfers/infra/prisma/repositories/TransfersRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    { provide: UNIT_OF_WORK, useClass: PrismaUnitOfWork },
    { provide: IAccountRepository, useClass: AccountsRepositoryPrisma },
    { provide: ITransferRepository, useClass: TransfersRepositoryPrisma },
  ],
  exports: [
    UNIT_OF_WORK,
    PrismaService,
    IAccountRepository,
    ITransferRepository,
  ],
})
export class PrismaModule {}
