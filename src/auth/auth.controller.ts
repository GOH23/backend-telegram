import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInDto } from './dto/login-in.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  async loginIn(@Body() loginInData: LoginInDto){
    
    return this.authService.loginIn(loginInData)
  }
}