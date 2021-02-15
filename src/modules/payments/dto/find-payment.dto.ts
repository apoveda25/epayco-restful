import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FindPaymentDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
