import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WALLET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'wallet',
          protoPath: join(__dirname, 'wallet.proto'),
          url: 'localhost:3010',
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
  exports: [WalletsService],
})
export class WalletsModule {}
