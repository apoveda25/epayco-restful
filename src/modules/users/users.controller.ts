import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserPopulate } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserPopulate })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserPopulate })
  @Get(':_id')
  async find(@Param() findUserDto: FindUserDto) {
    return await this.usersService.find(findUserDto);
  }

  @ApiOkResponse({ type: UserPopulate })
  @Get()
  async search(@Query() params: SearchUserDto) {
    return await this.usersService.search(params);
  }

  @ApiOkResponse({ type: UserPopulate })
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @ApiOkResponse({ type: UserPopulate })
  @Delete(':_id')
  async remove(@Param() removeUserDto: RemoveUserDto) {
    return await this.usersService.remove(removeUserDto);
  }
}
