import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountUseCase } from './CreateAccountUseCase';
import { ICreateAccountBody } from '../../dtos/ICreateAccountBody';

@ApiTags('accounts')
@Controller('accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  async handle(
    @Body()
    { initialDeposit }: ICreateAccountBody,
  ) {
    return await this.createAccountUseCase.execute({
      initialDeposit,
    });
  }
}
