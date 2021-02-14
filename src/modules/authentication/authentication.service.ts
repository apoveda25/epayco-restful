import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterAutheticationDto } from './dto/register-authetication.dto';
import { AuthServiceGrpc } from './interfaces/auth-service-grpc.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { WalletsService } from '../wallets/wallets.service';
import { LoginAutheticationDto } from './dto/login-authetication.dto';

@Injectable()
export class AuthenticationService implements OnModuleInit {
  private authServiceGrpc: AuthServiceGrpc;

  constructor(
    @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc,
    private usersService: UsersService,
    private walletsService: WalletsService,
  ) {}

  onModuleInit() {
    this.authServiceGrpc = this.client.getService<AuthServiceGrpc>(
      'AuthenticationService',
    );
  }

  async register(registerAutheticationDto: RegisterAutheticationDto) {
    try {
      const user$ = await this.authServiceGrpc.register(
        registerAutheticationDto,
      );
      const user = await user$.toPromise();
      const wallet$ = await this.walletsService.create({
        balance: 0,
        createdBy: user._id,
        user: user._id,
      });
      const wallet = await wallet$.toPromise();

      return await this.usersService.update({
        _id: user._id,
        updatedBy: user._id,
        wallet: wallet._id,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginAutheticationDto: LoginAutheticationDto) {
    try {
      return await this.authServiceGrpc.login(loginAutheticationDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
