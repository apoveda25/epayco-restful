import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'payment',
          protoPath: join(__dirname, 'payment.proto'),
          url: 'localhost:3010',
        },
      },
    ]),
    WalletsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
