import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService
  ){}


  async login(authDto: AuthDTO) {
    const { email, password } = authDto
    const user = await this.userService.findByEmail(email)

    if(!user){
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      throw new UnauthorizedException('Credenciais inválidas')
    }
    const payload = {
      sub: user._id.toString(),
      email: user.email
    }
    return {
      access_token: await this.jwtService.signAsync(payload, {  expiresIn: '24h' })
    }
    

  }

  async validateToken(token: string){
    try {
      const decoded = await this.jwtService.verifyAsync(token)
      const user = this.userService.findByEmail(decoded.email)
      if(!user){
        throw new UnauthorizedException('Credenciais inválidas')
      }
      return user
    }catch(error){
      throw new UnauthorizedException('Token invalido ou expirado')

    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
