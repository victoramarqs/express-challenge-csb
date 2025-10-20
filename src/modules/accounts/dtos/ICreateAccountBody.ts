import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class ICreateAccountBody {
  @ApiProperty({
    example: 1000.0,
    description: 'Depósito inicial; 0 é permitido',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  initialDeposit!: number;
}
