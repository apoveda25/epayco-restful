import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceGrpc } from './interfaces/users-service-grpc.interface';
import { UserPopulate } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { RemoveUserDto } from './dto/remove-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersServiceGrpc: UsersServiceGrpc;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usersServiceGrpc = this.client.getService<UsersServiceGrpc>(
      'UsersService',
    );
  }

  async create(createUserDto: CreateUserDto): Promise<UserPopulate> {
    try {
      return await this.usersServiceGrpc.create(createUserDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(findUserDto: FindUserDto): Promise<UserPopulate> {
    try {
      return await this.usersServiceGrpc.find(findUserDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(searchUserDto: SearchUserDto): Promise<SearchUsersDto> {
    try {
      return await this.usersServiceGrpc.search(searchUserDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserPopulate> {
    try {
      return await this.usersServiceGrpc.update(updateUserDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(removeUserDto: RemoveUserDto): Promise<UserPopulate> {
    try {
      return await this.usersServiceGrpc.remove(removeUserDto).toPromise();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
