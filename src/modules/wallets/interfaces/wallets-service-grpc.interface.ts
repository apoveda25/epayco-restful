import { Observable } from 'rxjs';
import { WalletPopulate } from '../entities/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { RemoveWalletDto } from '../dto/remove-wallet.dto';
import { FindWalletDto } from '../dto/find-wallet.dto';
import { SearchWalletDto } from '../dto/search-wallet.dto';
import { SearchWalletsDto } from '../dto/search-wallets.dto';

export interface WalletsServiceGrpc {
  create(data: CreateWalletDto): Promise<Observable<WalletPopulate>>;
  update(data: UpdateWalletDto): Promise<Observable<WalletPopulate>>;
  remove(data: RemoveWalletDto): Promise<Observable<WalletPopulate>>;
  find(data: FindWalletDto): Promise<Observable<WalletPopulate>>;
  search(data: SearchWalletDto): Promise<Observable<SearchWalletsDto>>;
}
