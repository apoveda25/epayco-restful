import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Recharge } from '../../recharges/entities/recharge.entity';
import { Payment } from '../../payments/entities/payment.entity';
export class Wallet {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;
}

export class WalletPopulate extends Wallet {
  @ApiProperty({ type: () => User, required: false })
  user?: User;

  @ApiProperty({ type: () => [Recharge], required: false })
  recharges?: Recharge[];

  @ApiProperty({ type: () => [Payment], required: false })
  payments?: Payment[];
}
