import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, Min, IsMongoId, IsOptional } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @Min(0)
  @IsOptional()
  mount?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @ApiProperty()
  @IsMongoId()
  updatedBy: string;
}
