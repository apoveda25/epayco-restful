import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsMongoId } from 'class-validator';

export class ConfirmPaymentDto {
  @ApiProperty()
  @Matches(/^[\d]{6}$/)
  code: string;

  @ApiProperty()
  @IsString()
  sesionId: string;

  @ApiProperty()
  @IsMongoId()
  updatedBy: string;
}
