import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional } from 'class-validator';

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
}
