import {
  Injectable,
  OnModuleInit,
  Inject,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { WalletsServiceGrpc } from './interfaces/wallets-service-grpc.interface';
import { WalletPopulate } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FindWalletDto } from './dto/find-wallet.dto';
import { SearchWalletDto } from './dto/search-wallet.dto';
import { SearchWalletsDto } from './dto/search-wallets.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RemoveWalletDto } from './dto/remove-wallet.dto';
import { GetBalanceWalletDto } from './dto/get-balance-wallet.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class WalletsService implements OnModuleInit {
  private walletsServiceGrpc: WalletsServiceGrpc;

  constructor(
    @Inject('WALLET_PACKAGE') private readonly client: ClientGrpc,
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    this.walletsServiceGrpc = this.client.getService<WalletsServiceGrpc>(
      'WalletsService',
    );
  }

  async getBalance({
    document,
    cellphone,
  }: GetBalanceWalletDto): Promise<WalletPopulate> {
    try {
      const { users } = await this.usersService.search({ document, cellphone });

      if (users && users.length) {
        return await this.walletsServiceGrpc
          .find({ _id: users[0].wallet._id })
          .toPromise();
      }

      throw new HttpException(
        'Document or cellphone invalid.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createWalletDto: CreateWalletDto): Promise<WalletPopulate> {
    try {
      return await this.walletsServiceGrpc.create(createWalletDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(findWalletDto: FindWalletDto): Promise<WalletPopulate> {
    try {
      return await this.walletsServiceGrpc.find(findWalletDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(searchWalletDto: SearchWalletDto): Promise<SearchWalletsDto> {
    try {
      return await this.walletsServiceGrpc.search(searchWalletDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateWalletDto: UpdateWalletDto): Promise<WalletPopulate> {
    try {
      return await this.walletsServiceGrpc.update(updateWalletDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(removeWalletDto: RemoveWalletDto): Promise<WalletPopulate> {
    try {
      return await this.walletsServiceGrpc.remove(removeWalletDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
