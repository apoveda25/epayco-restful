import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';
import { RegisterAutheticationDto } from '../dto/register-authetication.dto';
import { LoginAutheticationDto } from '../dto/login-authetication.dto';

export interface AuthServiceGrpc {
  register(data: RegisterAutheticationDto): Promise<Observable<User>>;
  login(data: LoginAutheticationDto): Promise<Observable<User>>;
}
