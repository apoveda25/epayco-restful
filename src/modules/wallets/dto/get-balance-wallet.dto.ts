import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class GetBalanceWalletDto {
  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsPhoneNumber()
  cellphone: string;
}
