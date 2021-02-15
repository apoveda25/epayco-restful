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
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { PaymentPopulate } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RemovePaymentDto } from './dto/remove-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiCreatedResponse({ type: PaymentPopulate })
  @Post(':_id/confirm')
  async confirm(
    @Param('_id') _id: string,
    @Body() confirmPaymentDto: ConfirmPaymentDto,
  ) {
    return await this.paymentsService.confirm(_id, confirmPaymentDto);
  }

  @ApiCreatedResponse({ type: PaymentPopulate })
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentsService.create(createPaymentDto);
  }

  @ApiOkResponse({ type: PaymentPopulate })
  @Get(':_id')
  async find(@Param('_id') _id: string) {
    return await this.paymentsService.find({ _id });
  }

  @ApiOkResponse({ type: PaymentPopulate })
  @Get()
  async search(@Query() params: SearchPaymentDto) {
    return await this.paymentsService.search(params);
  }

  @ApiOkResponse({ type: PaymentPopulate })
  @Patch()
  async update(updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentsService.update(updatePaymentDto);
  }

  @ApiOkResponse({ type: PaymentPopulate })
  @Delete()
  async remove(removePaymentDto: RemovePaymentDto) {
    return await this.paymentsService.remove(removePaymentDto);
  }
}
