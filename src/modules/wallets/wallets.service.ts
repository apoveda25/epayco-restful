import {
  Injectable,
  OnModuleInit,
  Inject,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { WalletsServiceGrpc } from './interfaces/wallets-service-grpc.interface';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FindWalletDto } from './dto/find-wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { SearchWalletsDto } from './dto/search-wallets.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RemoveWalletDto } from './dto/remove-wallet.dto';

@Injectable()
export class WalletsService implements OnModuleInit {
  private walletsServiceGrpc: WalletsServiceGrpc;

  constructor(@Inject('WALLET_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.walletsServiceGrpc = this.client.getService<WalletsServiceGrpc>(
      'WalletsService',
    );
  }

  async create(createWalletDto: CreateWalletDto): Promise<Observable<Wallet>> {
    try {
      return await this.walletsServiceGrpc.create(createWalletDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(findWalletDto: FindWalletDto): Promise<Observable<Wallet>> {
    try {
      return await this.walletsServiceGrpc.find(findWalletDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(
    searchWalletDto: SearchWalletDto,
  ): Promise<Observable<SearchWalletsDto>> {
    try {
      return await this.walletsServiceGrpc.search(searchWalletDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateWalletDto: UpdateWalletDto): Promise<Observable<Wallet>> {
    try {
      return await this.walletsServiceGrpc.update(updateWalletDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(removeWalletDto: RemoveWalletDto): Promise<Observable<Wallet>> {
    try {
      return await this.walletsServiceGrpc.remove(removeWalletDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
