import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../../wallets/entities/wallet.entity';

export class Payment {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  mount: number;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  code: string;

  @ApiProperty()
  sesionId: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;
}

export class PaymentPopulate extends Payment {
  @ApiProperty({ type: () => Wallet, required: false })
  wallet?: Wallet;
}
