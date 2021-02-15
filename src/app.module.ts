import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configApp } from './config/config-app';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { RechargesModule } from './modules/recharges/recharges.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { BullModule } from '@nestjs/bull';
import { configRedis } from './config/config-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configApp],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configRedis,
    }),
    UsersModule,
    WalletsModule,
    RechargesModule,
    PaymentsModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
