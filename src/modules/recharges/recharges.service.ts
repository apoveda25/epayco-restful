import { Injectable } from '@nestjs/common';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';

@Injectable()
export class RechargesService {
  create(createRechargeDto: CreateRechargeDto) {
    return 'This action adds a new recharge';
  }

  findAll() {
    return `This action returns all recharges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recharge`;
  }

  update(id: number, updateRechargeDto: UpdateRechargeDto) {
    return `This action updates a #${id} recharge`;
  }

  remove(id: number) {
    return `This action removes a #${id} recharge`;
  }
}
