import { Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserPopulate } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { SearchUserDto } from '../dto/search-user.dto';
import { SearchUsersDto } from '../dto/search-users.dto';

export interface UsersServiceGrpc {
  create(data: CreateUserDto): Observable<UserPopulate>;
  update(data: UpdateUserDto): Observable<UserPopulate>;
  remove(data: RemoveUserDto): Observable<UserPopulate>;
  find(data: FindUserDto): Observable<UserPopulate>;
  search(data: SearchUserDto): Observable<SearchUsersDto>;
}
