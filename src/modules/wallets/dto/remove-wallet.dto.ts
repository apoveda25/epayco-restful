import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RemoveWalletDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
