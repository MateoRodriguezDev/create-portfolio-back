import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkPassword } from 'src/helpers/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService,
  ) { }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid Credentials')
    }


    const isPasswordValid = await checkPassword(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials')
    }




    const payload = { email: user.email, idusuario: user.id };

    const token = await this.jwtService.signAsync(payload);


    return {
      token: token,
    };
  }
}
