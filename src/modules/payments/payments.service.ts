import {
  Injectable,
  OnModuleInit,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentPopulate } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FindPaymentDto } from './dto/find-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { SearchPaymentsDto } from './dto/search-payments.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RemovePaymentDto } from './dto/remove-payment.dto';
import { PaymentsServiceGrpc } from './interfaces/payments-service-grpc.interface';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private paymentsServiceGrpc: PaymentsServiceGrpc;

  constructor(
    @Inject('PAYMENT_PACKAGE') private readonly client: ClientGrpc,
    private walletsService: WalletsService,
  ) {}

  onModuleInit() {
    this.paymentsServiceGrpc = this.client.getService<PaymentsServiceGrpc>(
      'PaymentsService',
    );
  }

  async confirm(
    paymentId: string,
    confirmPaymentDto: ConfirmPaymentDto,
  ): Promise<PaymentPopulate> {
    try {
      const payment = await this.paymentsServiceGrpc
        .find({ _id: paymentId })
        .toPromise();

      if (
        payment.code === confirmPaymentDto.code &&
        payment.sesionId === confirmPaymentDto.sesionId
      ) {
        await this.walletsService.update({
          _id: payment.wallet._id,
          balance: payment.wallet.balance - payment.mount,
          updatedBy: confirmPaymentDto.updatedBy,
        });

        return await this.paymentsServiceGrpc
          .update({
            _id: paymentId,
            verified: true,
            updatedBy: confirmPaymentDto.updatedBy,
          })
          .toPromise();
      }

      throw new HttpException(
        'Payment code not valid.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentPopulate> {
    try {
      const payment = await this.paymentsServiceGrpc
        .create(createPaymentDto)
        .toPromise();

      // await this.mailerService.sendMail({
      //   to: 'test@nestjs.com', // list of receivers
      //   from: 'noreply@nestjs.com', // sender address
      //   subject: 'Testing Nest MailerModule ✔', // Subject line
      //   text: 'welcome', // plaintext body
      //   html: '<b>welcome</b>', // HTML body content
      // });

      return payment;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(findPaymentDto: FindPaymentDto): Promise<PaymentPopulate> {
    try {
      return await this.paymentsServiceGrpc.find(findPaymentDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(searchPaymentDto: SearchPaymentDto): Promise<SearchPaymentsDto> {
    try {
      return await this.paymentsServiceGrpc
        .search(searchPaymentDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updatePaymentDto: UpdatePaymentDto): Promise<PaymentPopulate> {
    try {
      return await this.paymentsServiceGrpc
        .update(updatePaymentDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(removePaymentDto: RemovePaymentDto): Promise<PaymentPopulate> {
    try {
      return await this.paymentsServiceGrpc
        .remove(removePaymentDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
