import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RechargesService } from './recharges.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';

@Controller('recharges')
export class RechargesController {
  constructor(private readonly rechargesService: RechargesService) {}

  @Post()
  create(@Body() createRechargeDto: CreateRechargeDto) {
    return this.rechargesService.create(createRechargeDto);
  }

  @Get()
  findAll() {
    return this.rechargesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rechargesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRechargeDto: UpdateRechargeDto) {
    return this.rechargesService.update(+id, updateRechargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rechargesService.remove(+id);
  }
}
