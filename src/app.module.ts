import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';
import { CreateAccountController } from './modules/accounts/useCases/createAccount/CreateAccountController';
import { CreateAccountUseCase } from './modules/accounts/useCases/createAccount/CreateAccountUseCase';
import { LockModule } from './shared/infra/lock/lock.module';
import { TransferUseCase } from './modules/transfers/useCases/transfer/TransferUseCase';
import { TransferController } from './modules/transfers/useCases/transfer/TransferController';

@Module({
  imports: [PrismaModule, LockModule],
  controllers: [CreateAccountController, TransferController],
  providers: [CreateAccountUseCase, TransferUseCase],
})
export class AppModule {}
