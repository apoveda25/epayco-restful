import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './modules/users/users.module';
import { ValidationPipe } from '@nestjs/common';
import { WalletsModule } from './modules/wallets/wallets.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { RechargesModule } from './modules/recharges/recharges.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('ePayco API')
    .setDescription('The ePayco API description')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Users')
    .addTag('Wallets')
    .addTag('Recharges')
    .addTag('Payments')
    .build();

  const documents = SwaggerModule.createDocument(app, config, {
    include: [
      AuthenticationModule,
      UsersModule,
      WalletsModule,
      RechargesModule,
    ],
  });

  SwaggerModule.setup('api/v1', app, documents);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('app.port'));
}
bootstrap();
