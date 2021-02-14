import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsMongoId,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(8, 16)
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  cellphone: string;

  @ApiProperty()
  @IsMongoId()
  createdBy: string;
}
