import {
  Injectable,
  OnModuleInit,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { RechargePopulate } from './entities/recharge.entity';
import { FindRechargeDto } from './dto/find-recharge.dto';
import { SearchRechargeDto } from './dto/search-recharge.dto';
import { SearchRechargesDto } from './dto/search-recharges.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';
import { RemoveRechargeDto } from './dto/remove-recharge.dto';
import { RechargesServiceGrpc } from './interfaces/recharges-service-grpc.interface';
import { UsersService } from '../users/users.service';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class RechargesService implements OnModuleInit {
  private rechargesServiceGrpc: RechargesServiceGrpc;

  constructor(
    @Inject('RECHARGE_PACKAGE') private readonly client: ClientGrpc,
    private usersService: UsersService,
    private walletsService: WalletsService,
  ) {}

  onModuleInit() {
    this.rechargesServiceGrpc = this.client.getService<RechargesServiceGrpc>(
      'RechargesService',
    );
  }

  async create({
    document,
    cellphone,
    createdBy,
    mount,
  }: CreateRechargeDto): Promise<RechargePopulate> {
    try {
      const { users } = await this.usersService.search({
        document,
        cellphone,
      });

      if (users && users.length) {
        const wallet = await this.walletsService.find({
          _id: users[0].wallet._id,
        });

        const recharge = await this.rechargesServiceGrpc
          .create({
            mount,
            createdBy,
            wallet: wallet._id,
          })
          .toPromise();

        const walletRecharges = Array.isArray(wallet.recharges)
          ? wallet.recharges.map((recharge) => recharge._id)
          : [];

        await this.walletsService.update({
          _id: wallet._id,
          balance: wallet.balance + recharge.mount,
          updatedBy: users[0]._id,
          recharges: [...walletRecharges, recharge._id],
        });

        return recharge;
      }

      throw new HttpException(
        'Document or cellphone invalid.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(findRechargeDto: FindRechargeDto): Promise<RechargePopulate> {
    try {
      return await this.rechargesServiceGrpc.find(findRechargeDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(
    searchRechargeDto: SearchRechargeDto,
  ): Promise<SearchRechargesDto> {
    try {
      return await this.rechargesServiceGrpc
        .search(searchRechargeDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    updateRechargeDto: UpdateRechargeDto,
  ): Promise<RechargePopulate> {
    try {
      return await this.rechargesServiceGrpc
        .update(updateRechargeDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(
    removeRechargeDto: RemoveRechargeDto,
  ): Promise<RechargePopulate> {
    try {
      return await this.rechargesServiceGrpc
        .remove(removeRechargeDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
