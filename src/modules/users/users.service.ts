import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
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

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Observable<UserPopulate>> {
    try {
      return await this.usersServiceGrpc.create(createUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(findUserDto: FindUserDto): Promise<Observable<UserPopulate>> {
    try {
      return await this.usersServiceGrpc.find(findUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(
    searchUserDto: SearchUserDto,
  ): Promise<Observable<SearchUsersDto>> {
    try {
      return await this.usersServiceGrpc.search(searchUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    updateUserDto: UpdateUserDto,
  ): Promise<Observable<UserPopulate>> {
    try {
      return await this.usersServiceGrpc.update(updateUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(
    removeUserDto: RemoveUserDto,
  ): Promise<Observable<UserPopulate>> {
    try {
      return await this.usersServiceGrpc.remove(removeUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
