import { UserPopulate } from '../entities/user.entity';

export interface SearchUsersDto {
  users: UserPopulate[];
}
