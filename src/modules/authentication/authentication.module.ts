import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'authentication',
          protoPath: join(__dirname, 'authentication.proto'),
          url: 'localhost:3010',
        },
      },
    ]),
    UsersModule,
    WalletsModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
