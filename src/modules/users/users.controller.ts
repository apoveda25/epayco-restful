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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.usersService.find({ _id: id });
  }

  @ApiOkResponse({ type: User })
  @ApiQuery({ name: 'cellphone', type: String, required: false })
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiQuery({ name: 'surname', type: String, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'document', type: String, required: false })
  @ApiQuery({ name: 'id', type: String, required: false })
  @Get()
  async search(@Query() params: SearchUserDto) {
    return await this.usersService.search(params);
  }

  @ApiOkResponse({ type: User })
  @Patch()
  async update(updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @ApiOkResponse({ type: User })
  @Delete()
  async remove(removeUserDto: RemoveUserDto) {
    return await this.usersService.remove(removeUserDto);
  }
}
