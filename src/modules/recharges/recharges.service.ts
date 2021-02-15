import {
  Injectable,
  OnModuleInit,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
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
  }: CreateRechargeDto): Promise<Observable<RechargePopulate>> {
    try {
      const user$ = await this.usersService.search({
        document,
        cellphone,
      });

      const { users } = await user$.toPromise();

      if (users && users.length) {
        const wallet$ = await this.walletsService.find({
          _id: users[0].wallet._id,
        });

        const wallet = await wallet$.toPromise();

        const recharge$ = await this.rechargesServiceGrpc.create({
          mount,
          createdBy,
          wallet: wallet._id,
        });

        const recharge = await recharge$.toPromise();

        const walletRecharges = Array.isArray(wallet.recharges)
          ? wallet.recharges.map((recharge) => recharge._id)
          : [];

        const walletUpdated$ = await this.walletsService.update({
          _id: wallet._id,
          balance: wallet.balance + recharge.mount,
          updatedBy: users[0]._id,
          recharges: [...walletRecharges, recharge._id],
        });

        await walletUpdated$.toPromise();

        return recharge$;
      }

      throw new HttpException(
        'Document or cellphone invalid.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(
    findRechargeDto: FindRechargeDto,
  ): Promise<Observable<RechargePopulate>> {
    try {
      return await this.rechargesServiceGrpc.find(findRechargeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(
    searchRechargeDto: SearchRechargeDto,
  ): Promise<Observable<SearchRechargesDto>> {
    try {
      return await this.rechargesServiceGrpc.search(searchRechargeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    updateRechargeDto: UpdateRechargeDto,
  ): Promise<Observable<RechargePopulate>> {
    try {
      return await this.rechargesServiceGrpc.update(updateRechargeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(
    removeRechargeDto: RemoveRechargeDto,
  ): Promise<Observable<RechargePopulate>> {
    try {
      return await this.rechargesServiceGrpc.remove(removeRechargeDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
