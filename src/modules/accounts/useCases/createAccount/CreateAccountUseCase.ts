import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from '../../repositories/IAccountRepository';
import { Account } from '../../entities/Account';
import { gerarDvModulo11 } from '@/utils/dv-generator';
import {
  UNIT_OF_WORK,
  UnitOfWork,
  TransactionContext,
} from '@/shared/application/uow/unit-of-work';

interface IRequest {
  initialDeposit: number;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(UNIT_OF_WORK) private readonly uow: UnitOfWork,
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({ initialDeposit }: IRequest) {
    if (initialDeposit < 0) {
      throw new BadRequestException(
        'O valor do depósito inicial não pode ser negativo.',
      );
    }

    const decimals = initialDeposit.toString().split('.')[1];
    if (decimals && decimals.length > 2) {
      throw new BadRequestException(
        'O valor do depósito inicial deve ter até duas casas decimais.',
      );
    }

    return this.uow.runInTransaction(async (tx: TransactionContext) => {
      const created = await this.accountRepository.create(
        new Account({ balance: initialDeposit }),
        tx,
      );
      const dv = gerarDvModulo11(created.accountNumberBase);
      await this.accountRepository.updateDv(created.id, dv, tx);

      const formatted = String(created.accountNumberBase).padStart(5, '0');

      return {
        id: created.id,
        accountNumber: formatted,
        accountDv: dv,
        balance: created.balance,
      };
    });
  }
}
