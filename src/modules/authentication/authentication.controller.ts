import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { RegisterAutheticationDto } from './dto/register-authetication.dto';
import { LoginAutheticationDto } from './dto/login-authetication.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/register')
  async register(@Body() registerAutheticationDto: RegisterAutheticationDto) {
    return this.authService.register(registerAutheticationDto);
  }

  @Post('/login')
  async login(@Body() loginAutheticationDto: LoginAutheticationDto) {
    return this.authService.login(loginAutheticationDto);
  }
}
