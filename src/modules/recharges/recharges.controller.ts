import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { RechargesService } from './recharges.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';
import { RechargePopulate } from './entities/recharge.entity';
import { SearchRechargeDto } from './dto/search-recharge.dto';
import { RemoveRechargeDto } from './dto/remove-recharge.dto';

@ApiTags('Recharges')
@Controller('recharges')
export class RechargesController {
  constructor(private readonly rechargesService: RechargesService) {}

  @ApiCreatedResponse({ type: RechargePopulate })
  @Post()
  async create(@Body() createRechargeDto: CreateRechargeDto) {
    return await this.rechargesService.create(createRechargeDto);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.rechargesService.find({ _id: id });
  }

  @ApiOkResponse({ type: RechargePopulate })
  @ApiQuery({ name: 'mount', type: Number, required: false })
  @ApiQuery({ name: 'id', type: String, required: false })
  @Get()
  async search(@Query() params: SearchRechargeDto) {
    return await this.rechargesService.search(params);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Patch()
  async update(updateRechargeDto: UpdateRechargeDto) {
    return await this.rechargesService.update(updateRechargeDto);
  }

  @ApiOkResponse({ type: RechargePopulate })
  @Delete()
  async remove(removeRechargeDto: RemoveRechargeDto) {
    return await this.rechargesService.remove(removeRechargeDto);
  }
}
