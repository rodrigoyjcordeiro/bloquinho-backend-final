import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import type { AuthRequest } from './auth.request';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post()
 login(@Body() authDto: AuthDTO ){
  return this.authService.login(authDto)
 }

 @Get('me')
 @UseGuards(AuthGuard)
 async me(@GetUser() user: any){
  return {
      authenticated: true,
      user
    }

  }
}

