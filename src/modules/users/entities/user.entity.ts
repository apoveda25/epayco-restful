import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../../wallets/entities/wallet.entity';

export class User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  cellphone: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;
}

export class UserPopulate extends User {
  @ApiProperty({ type: () => Wallet, required: false })
  wallet?: Wallet;
}
