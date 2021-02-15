import { PaymentPopulate } from '../entities/payment.entity';

export interface SearchPaymentsDto {
  payments: PaymentPopulate[];
}
