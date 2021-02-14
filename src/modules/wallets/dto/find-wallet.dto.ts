import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FindWalletDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
