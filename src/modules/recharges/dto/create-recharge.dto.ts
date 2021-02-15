import { ApiProperty } from '@nestjs/swagger';
import { Min, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRechargeDto {
  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  cellphone: string;

  @ApiProperty()
  @Min(0)
  mount: number;

  @ApiProperty()
  @IsMongoId()
  createdBy: string;

  // @ApiProperty()
  @IsMongoId()
  @IsOptional()
  wallet?: string;
}
