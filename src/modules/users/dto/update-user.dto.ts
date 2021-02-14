import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsMongoId,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  document?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  cellphone?: string;

  @ApiProperty()
  @IsMongoId()
  updatedBy: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  wallet?: string;
}
