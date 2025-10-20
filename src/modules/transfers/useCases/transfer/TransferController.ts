import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransferUseCase } from './TransferUseCase';
import { ICreateTransferBody } from '../../dtos/ICreateTransferBody';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(private transferUseCase: TransferUseCase) {}

  @Post()
  async handle(
    @Body()
    { transactionId, fromAccountId, toAccountId, amount }: ICreateTransferBody,
  ) {
    return await this.transferUseCase.execute({
      transactionId,
      fromAccountId,
      toAccountId,
      amount,
    });
  }
}
