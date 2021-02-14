import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginAutheticationDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(8, 16)
  password: string;
}
