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
import { WalletsService } from './wallets.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletPopulate } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RemoveWalletDto } from './dto/remove-wallet.dto';
import { GetBalanceWalletDto } from './dto/get-balance-wallet.dto';
import { FindWalletDto } from './dto/find-wallet.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiOkResponse({ type: WalletPopulate })
  @Get('/get-balance')
  async getBalance(@Query() getBalanceWalletDto: GetBalanceWalletDto) {
    return await this.walletsService.getBalance(getBalanceWalletDto);
  }

  @ApiCreatedResponse({ type: WalletPopulate })
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletsService.create(createWalletDto);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Get(':_id')
  async find(@Param() findWalletDto: FindWalletDto) {
    return await this.walletsService.find(findWalletDto);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Get()
  async search(@Query() params: SearchWalletDto) {
    return await this.walletsService.search(params);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Patch()
  async update(@Body() updateWalletDto: UpdateWalletDto) {
    return await this.walletsService.update(updateWalletDto);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Delete(':_id')
  async remove(@Param() removeWalletDto: RemoveWalletDto) {
    return await this.walletsService.remove(removeWalletDto);
  }
}
