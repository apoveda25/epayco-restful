import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginAutheticationDto } from './dto/login-authetication.dto';
import { RegisterAutheticationDto } from './dto/register-authetication.dto';

@ApiTags('Authentication')
@Controller('/api/v1/authentication')
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
