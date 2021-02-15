import { Observable } from 'rxjs';
import { WalletPopulate } from '../entities/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { RemoveWalletDto } from '../dto/remove-wallet.dto';
import { FindWalletDto } from '../dto/find-wallet.dto';
import { SearchWalletDto } from '../dto/search-wallet.dto';
import { SearchWalletsDto } from '../dto/search-wallets.dto';

export interface WalletsServiceGrpc {
  create(data: CreateWalletDto): Observable<WalletPopulate>;
  update(data: UpdateWalletDto): Observable<WalletPopulate>;
  remove(data: RemoveWalletDto): Observable<WalletPopulate>;
  find(data: FindWalletDto): Observable<WalletPopulate>;
  search(data: SearchWalletDto): Observable<SearchWalletsDto>;
}
