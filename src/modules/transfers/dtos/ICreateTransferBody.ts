import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class ICreateTransferBody {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  transactionId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  fromAccountId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  toAccountId!: string;

  @ApiProperty({ example: 100.5, minimum: 0.01 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount!: number;
}
