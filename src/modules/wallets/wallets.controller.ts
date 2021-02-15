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
import { WalletPopulate } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RemoveWalletDto } from './dto/remove-wallet.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiCreatedResponse({ type: WalletPopulate })
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletsService.create(createWalletDto);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.walletsService.find({ _id: id });
  }

  @ApiOkResponse({ type: WalletPopulate })
  @ApiQuery({ name: 'balance', type: Number, required: false })
  @ApiQuery({ name: 'id', type: String, required: false })
  @Get()
  async search(@Query() params: SearchWalletDto) {
    return await this.walletsService.search(params);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Patch()
  async update(updateWalletDto: UpdateWalletDto) {
    return await this.walletsService.update(updateWalletDto);
  }

  @ApiOkResponse({ type: WalletPopulate })
  @Delete()
  async remove(removeWalletDto: RemoveWalletDto) {
    return await this.walletsService.remove(removeWalletDto);
  }
}
