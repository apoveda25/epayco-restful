import { Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { SearchUserDto } from '../dto/search-user.dto';
import { SearchUsersDto } from '../dto/search-users.dto';

export interface UsersServiceGrpc {
  create(data: CreateUserDto): Promise<Observable<User>>;
  update(data: UpdateUserDto): Promise<Observable<User>>;
  remove(data: RemoveUserDto): Promise<Observable<User>>;
  find(data: FindUserDto): Promise<Observable<User>>;
  search(data: SearchUserDto): Promise<Observable<SearchUsersDto>>;
}
