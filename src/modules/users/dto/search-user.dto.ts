import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class SearchUserDto {
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
