import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RemoveUserDto {
  @ApiProperty()
  @IsMongoId()
  _id: string;
}
