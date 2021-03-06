import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional } from 'class-validator';

export class UpdateRechargeDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @Min(0)
  @IsOptional()
  mount?: number;

  @ApiProperty()
  @IsMongoId()
  updatedBy: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  wallet?: string;
}
