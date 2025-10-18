import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';
import { CreateAccountController } from './modules/accounts/useCases/createAccount/CreateAccountController';
import { CreateAccountUseCase } from './modules/accounts/useCases/createAccount/CreateAccountUseCase';

@Module({
  imports: [PrismaModule],
  controllers: [CreateAccountController],
  providers: [CreateAccountUseCase],
})
export class AppModule {}
