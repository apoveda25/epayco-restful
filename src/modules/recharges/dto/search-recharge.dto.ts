import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional } from 'class-validator';

export class SearchRechargeDto {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty({ required: false })
  @Min(0)
  @IsOptional()
  mount?: number;
}
