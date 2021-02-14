import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class RegisterAutheticationDto {
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
}
