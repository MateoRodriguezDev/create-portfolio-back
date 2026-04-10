import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
    @ApiOperation({ summary: 'Inicia Sesión' })
    @ApiResponse({ status: 201, description: 'Login Correcto' })
    @ApiResponse({ status: 400, description: 'Invalid Credentials' })
    create(@Body() loginAuthDto: LoginAuthDto) {
      return this.authService.login(loginAuthDto.UIDtoken);
    }

}
