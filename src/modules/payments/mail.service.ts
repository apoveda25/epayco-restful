import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IBody } from './interfaces/mail.interface';
import { IConfirmPayment } from './interfaces/confirm-payment.interface';

@Injectable()
export class MailService {
  private readonly confirmPayment = 'confirm-payment';
  constructor(@InjectQueue('MAIL') private mailQueue: Queue) {}

  async sendConfirmPayment(body: IBody, data: IConfirmPayment) {
    return await this.mailQueue.add(this.confirmPayment, { body, data });
  }
}
