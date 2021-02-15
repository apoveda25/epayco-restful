import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, Min, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @Min(0)
  mount: number;

  @ApiProperty()
  @IsString()
  sesionId: string;

  @ApiProperty()
  @IsMongoId()
  createdBy: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  wallet?: string;
}
