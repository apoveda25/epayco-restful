import { Observable } from 'rxjs';
import { RechargePopulate } from '../entities/recharge.entity';
import { SearchRechargesDto } from '../dto/search-recharges.dto';
import { UpdateRechargeDto } from '../dto/update-recharge.dto';
import { RemoveRechargeDto } from '../dto/remove-recharge.dto';
import { FindRechargeDto } from '../dto/find-recharge.dto';
import { SearchRechargeDto } from '../dto/search-recharge.dto';
import { CreateRechargeServiceDto } from '../dto/create-recharge-service.dto';

export interface RechargesServiceGrpc {
  create(data: CreateRechargeServiceDto): Promise<Observable<RechargePopulate>>;
  update(data: UpdateRechargeDto): Promise<Observable<RechargePopulate>>;
  remove(data: RemoveRechargeDto): Promise<Observable<RechargePopulate>>;
  find(data: FindRechargeDto): Promise<Observable<RechargePopulate>>;
  search(data: SearchRechargeDto): Promise<Observable<SearchRechargesDto>>;
}
