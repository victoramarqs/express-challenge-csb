import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITransferRepository } from '../../repositories/ITransferRepository';
import { Transfer } from '../../entities/Transfer';
import { IAccountRepository } from '@/modules/accounts/repositories/IAccountRepository';
import {
  UNIT_OF_WORK,
  UnitOfWork,
} from '@/shared/application/uow/unit-of-work';
import { LockService } from '@/shared/infra/lock/lock.service';

interface IRequest {
  transactionId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

export interface TransferResult {
  transfer: Transfer;
  idempotent: boolean;
}

@Injectable()
export class TransferUseCase {
  constructor(
    @Inject(UNIT_OF_WORK) private readonly uow: UnitOfWork,
    private readonly lockService: LockService,
    private readonly transferRepository: ITransferRepository,
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({
    transactionId,
    fromAccountId,
    toAccountId,
    amount,
  }: IRequest): Promise<TransferResult> {
    if (fromAccountId === toAccountId) {
      throw new BadRequestException(
        'As contas de origem e destino devem ser diferentes.',
      );
    }

    if (amount <= 0) {
      throw new BadRequestException(
        'O valor da transferência deve ser maior que zero.',
      );
    }

    const decimals = amount.toString().split('.')[1];
    if (decimals && decimals.length > 2) {
      throw new BadRequestException(
        'O valor da transferência deve ter até duas casas decimais.',
      );
    }

    return await this.lockService.withLocks(
      [`account:${fromAccountId}`, `account:${toAccountId}`],
      async () => {
        return this.uow.runInTransaction(async (tx) => {
          const existing = await this.transferRepository.findByTransactionId(
            transactionId,
            tx,
          );

          if (existing) {
            return { transfer: existing, idempotent: true };
          }

          const sender = await this.accountRepository.findById(
            fromAccountId,
            tx,
          );

          if (!sender) {
            throw new NotFoundException('Conta de origem não encontrada.');
          }

          const recipient = await this.accountRepository.findById(
            toAccountId,
            tx,
          );

          if (!recipient) {
            throw new NotFoundException('Conta de destino não encontrada.');
          }

          const hasSufficientFunds = await this.accountRepository.debitIfEnough(
            fromAccountId,
            amount,
            tx,
          );

          if (!hasSufficientFunds) {
            throw new BadRequestException(
              'Saldo insuficiente para realizar a transferência.',
            );
          }

          await this.accountRepository.credit(toAccountId, amount, tx);

          const transfer = await this.transferRepository.create(
            new Transfer({
              transactionId,
              fromAccountId,
              toAccountId,
              amount,
            }),
            tx,
          );

          return { transfer, idempotent: false };
        });
      },
      { ttlMs: 5000 },
    );
  }
}
