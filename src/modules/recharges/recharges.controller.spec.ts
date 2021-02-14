import { Test, TestingModule } from '@nestjs/testing';
import { RechargesController } from './recharges.controller';
import { RechargesService } from './recharges.service';

describe('RechargesController', () => {
  let controller: RechargesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargesController],
      providers: [RechargesService],
    }).compile();

    controller = module.get<RechargesController>(RechargesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
