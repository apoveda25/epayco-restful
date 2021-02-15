import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  document?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber()
  @IsOptional()
  cellphone?: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  updatedBy: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  wallet?: string;
}
