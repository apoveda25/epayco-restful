import { Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserPopulate } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { SearchUserDto } from '../dto/search-user.dto';
import { SearchUsersDto } from '../dto/search-users.dto';

export interface UsersServiceGrpc {
  create(data: CreateUserDto): Promise<Observable<UserPopulate>>;
  update(data: UpdateUserDto): Promise<Observable<UserPopulate>>;
  remove(data: RemoveUserDto): Promise<Observable<UserPopulate>>;
  find(data: FindUserDto): Promise<Observable<UserPopulate>>;
  search(data: SearchUserDto): Promise<Observable<SearchUsersDto>>;
}
