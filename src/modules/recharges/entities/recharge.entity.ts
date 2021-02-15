import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../../wallets/entities/wallet.entity';
export class Recharge {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  mount: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;
}

export class RechargePopulate extends Recharge {
  @ApiProperty({ type: () => Wallet, required: false })
  wallet: Wallet;
}
