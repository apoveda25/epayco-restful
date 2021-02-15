import { Observable } from 'rxjs';
import { RechargePopulate } from '../entities/recharge.entity';
import { SearchRechargesDto } from '../dto/search-recharges.dto';
import { UpdateRechargeDto } from '../dto/update-recharge.dto';
import { RemoveRechargeDto } from '../dto/remove-recharge.dto';
import { FindRechargeDto } from '../dto/find-recharge.dto';
import { SearchRechargeDto } from '../dto/search-recharge.dto';
import { CreateRechargeServiceDto } from '../dto/create-recharge-service.dto';

export interface RechargesServiceGrpc {
  create(data: CreateRechargeServiceDto): Observable<RechargePopulate>;
  update(data: UpdateRechargeDto): Observable<RechargePopulate>;
  remove(data: RemoveRechargeDto): Observable<RechargePopulate>;
  find(data: FindRechargeDto): Observable<RechargePopulate>;
  search(data: SearchRechargeDto): Observable<SearchRechargesDto>;
}
