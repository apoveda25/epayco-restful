import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RemoveRechargeDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
