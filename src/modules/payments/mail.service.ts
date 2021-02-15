import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IConfirmPayment } from './interfaces/confirm-payment.interface';

@Injectable()
export class MailService {
  private readonly confirmPayment = 'confirm-payment';
  constructor(@InjectQueue('MAIL') private mailQueue: Queue) {}

  async sendConfirmPayment(data: IConfirmPayment) {
    return await this.mailQueue.add(this.confirmPayment, data);
  }
}
