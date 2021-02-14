import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configApp } from './config/config-app';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { RechargesModule } from './modules/recharges/recharges.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configApp],
    }),
    UsersModule,
    WalletsModule,
    RechargesModule,
    PaymentsModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
