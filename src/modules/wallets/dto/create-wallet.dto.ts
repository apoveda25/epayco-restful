import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, Min } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty()
  @Min(0)
  balance: number;

  @ApiProperty()
  @IsMongoId()
  createdBy: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  user?: string;
}
