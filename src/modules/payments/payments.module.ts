import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { MailService } from './mail.service';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { WalletsModule } from '../wallets/wallets.module';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_PACKAGE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'payment',
            protoPath: join(__dirname, 'payment.proto'),
            url: configService.get('grpc.payment.url'),
          },
        }),
      },
    ]),
    BullModule.registerQueue({
      name: 'MAIL',
    }),
    WalletsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, MailService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
