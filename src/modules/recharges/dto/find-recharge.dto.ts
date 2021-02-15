import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FindRechargeDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
