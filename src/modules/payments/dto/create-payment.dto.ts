import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, Min } from 'class-validator';

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
  wallet: string;
}
