import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RemovePaymentDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
