import { Observable } from 'rxjs';
import { Wallet } from '../entities/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { RemoveWalletDto } from '../dto/remove-wallet.dto';
import { FindWalletDto } from '../dto/find-wallet.dto';
import { SearchWalletDto } from '../dto/search-wallet.dto';
import { SearchWalletsDto } from '../dto/search-wallets.dto';

export interface WalletsServiceGrpc {
  create(data: CreateWalletDto): Promise<Observable<Wallet>>;
  update(data: UpdateWalletDto): Promise<Observable<Wallet>>;
  remove(data: RemoveWalletDto): Promise<Observable<Wallet>>;
  find(data: FindWalletDto): Promise<Observable<Wallet>>;
  search(data: SearchWalletDto): Promise<Observable<SearchWalletsDto>>;
}
