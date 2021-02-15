import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class SearchPaymentDto {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty({ required: false })
  @Min(0)
  @IsOptional()
  mount?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  sessionId?: string;
}
