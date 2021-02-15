import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional, IsArray } from 'class-validator';

export class UpdateWalletDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @Min(0)
  @IsOptional()
  balance?: number;

  @ApiProperty()
  @IsMongoId()
  updatedBy: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  user?: string;

  @ApiProperty()
  @IsArray({ context: IsMongoId })
  @IsOptional()
  recharges?: string[];

  @ApiProperty()
  @IsArray({ context: IsMongoId })
  @IsOptional()
  payments?: string[];
}
