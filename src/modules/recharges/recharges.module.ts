import { Module } from '@nestjs/common';
import { RechargesService } from './recharges.service';
import { RechargesController } from './recharges.controller';

@Module({
  controllers: [RechargesController],
  providers: [RechargesService]
})
export class RechargesModule {}
