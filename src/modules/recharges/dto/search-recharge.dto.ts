import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional } from 'class-validator';

export class SearchRechargeDto {
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty()
  @Min(0)
  @IsOptional()
  mount?: number;
}
