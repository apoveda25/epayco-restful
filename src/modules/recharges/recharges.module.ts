import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RechargesService } from './recharges.service';
import { RechargesController } from './recharges.controller';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RECHARGE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'recharge',
          protoPath: join(__dirname, 'recharge.proto'),
          url: 'localhost:3010',
        },
      },
    ]),
    UsersModule,
    WalletsModule,
  ],
  controllers: [RechargesController],
  providers: [RechargesService],
  exports: [RechargesService],
})
export class RechargesModule {}
