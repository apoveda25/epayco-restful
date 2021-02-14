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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RemoveWalletDto } from './dto/remove-wallet.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiCreatedResponse({ type: Wallet })
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletsService.create(createWalletDto);
  }

  @ApiOkResponse({ type: Wallet })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.walletsService.find({ _id: id });
  }

  @ApiOkResponse({ type: Wallet })
  @ApiQuery({ name: 'balance', type: Number, required: false })
  @ApiQuery({ name: 'id', type: String, required: false })
  @Get()
  async search(@Query() params: SearchWalletDto) {
    return await this.walletsService.search(params);
  }

  @ApiOkResponse({ type: Wallet })
  @Patch()
  async update(updateWalletDto: UpdateWalletDto) {
    return await this.walletsService.update(updateWalletDto);
  }

  @ApiOkResponse({ type: Wallet })
  @Delete()
  async remove(removeWalletDto: RemoveWalletDto) {
    return await this.walletsService.remove(removeWalletDto);
  }
}
