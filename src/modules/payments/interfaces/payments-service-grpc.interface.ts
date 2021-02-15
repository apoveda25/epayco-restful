import { Observable } from 'rxjs';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentPopulate } from '../entities/payment.entity';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { RemovePaymentDto } from '../dto/remove-payment.dto';
import { FindPaymentDto } from '../dto/find-payment.dto';
import { SearchPaymentDto } from '../dto/search-payment.dto';
import { SearchPaymentsDto } from '../dto/search-payments.dto';

export interface PaymentsServiceGrpc {
  create(data: CreatePaymentDto): Promise<Observable<PaymentPopulate>>;
  update(data: UpdatePaymentDto): Promise<Observable<PaymentPopulate>>;
  remove(data: RemovePaymentDto): Promise<Observable<PaymentPopulate>>;
  find(data: FindPaymentDto): Promise<Observable<PaymentPopulate>>;
  search(data: SearchPaymentDto): Promise<Observable<SearchPaymentsDto>>;
}
