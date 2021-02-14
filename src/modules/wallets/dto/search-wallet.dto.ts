import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional } from 'class-validator';

export class SearchWalletDto {
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty()
  @Min(0)
  @IsOptional()
  balance?: number;
}
