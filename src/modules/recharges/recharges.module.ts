import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RechargesService } from './recharges.service';
import { RechargesController } from './recharges.controller';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RECHARGE_PACKAGE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'recharge',
            protoPath: join(__dirname, 'recharge.proto'),
            url: configService.get('grpc.recharge.url'),
          },
        }),
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
