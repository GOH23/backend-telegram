import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInDto } from './dto/login-in.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  async loginIn(@Body() loginInData: LoginInDto){
    return this.authService.loginIn(loginInData)
  }
}
