import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class FindUserDto {
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  cellphone?: string;
}
