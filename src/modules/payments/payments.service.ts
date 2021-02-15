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
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentsServiceGrpc } from './interfaces/payments-service-grpc.interface';
import { WalletsService } from '../wallets/wallets.service';
import { MailService } from './mail.service';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private paymentsServiceGrpc: PaymentsServiceGrpc;

  constructor(
    @Inject('PAYMENT_PACKAGE') private readonly client: ClientGrpc,
    private walletsService: WalletsService,
    private mailService: MailService,
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

      const wallet = await this.walletsService.find({
        _id: createPaymentDto.wallet,
      });

      const walletPayments = Array.isArray(wallet.payments)
        ? wallet.payments.map((payment) => payment._id)
        : [];

      await this.walletsService.update({
        _id: createPaymentDto.wallet,
        updatedBy: createPaymentDto.createdBy,
        payments: [...walletPayments, payment._id],
      });

      await this.mailService.sendConfirmPayment(
        {
          to: [{ email: wallet.user.email, name: wallet.user.name }],
        },
        { code: payment.code },
      );

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
