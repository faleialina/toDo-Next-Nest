import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('register')
  async registerUser(@Body() data) {
    return await this.userService.createUserService(data);
  }

  @Post('authenticate')
  async authenticateUser(@Body() data) {
    return await this.userService.getUserService(data);
  }
}
