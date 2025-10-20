import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from '../../repositories/IAccountRepository';
import { Account } from '../../entities/Account';

interface IRequest {
  initialDeposit: number;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountRepository: IAccountRepository) {}

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

    const created = await this.accountRepository.create(
      new Account({ balance: initialDeposit }),
    );
    const formatted = String(created.accountNumberBase).padStart(5, '0');

    return {
      id: created.id,
      accountNumber: formatted,
      balance: created.balance,
    };
  }
}
