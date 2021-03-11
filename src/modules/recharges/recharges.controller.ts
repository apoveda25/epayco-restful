import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { FindRechargeDto } from './dto/find-recharge.dto';
import { RemoveRechargeDto } from './dto/remove-recharge.dto';
import { SearchRechargeDto } from './dto/search-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';
import { RechargePopulate } from './entities/recharge.entity';
import { RechargesService } from './recharges.service';

@ApiTags('Recharges')
@Controller('/api/v1/recharges')
export class RechargesController {
  constructor(private readonly rechargesService: RechargesService) {}

  @ApiCreatedResponse({ type: RechargePopulate })
  @Post()
  async create(@Body() createRechargeDto: CreateRechargeDto) {
    return await this.rechargesService.create(createRechargeDto);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Get(':_id')
  async find(@Param() findRechargeDto: FindRechargeDto) {
    return await this.rechargesService.find(findRechargeDto);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Get()
  async search(@Query() params: SearchRechargeDto) {
    return await this.rechargesService.search(params);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Patch()
  async update(@Body() updateRechargeDto: UpdateRechargeDto) {
    return await this.rechargesService.update(updateRechargeDto);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Delete(':_id')
  async remove(@Param() removeRechargeDto: RemoveRechargeDto) {
    return await this.rechargesService.remove(removeRechargeDto);
  }
}
