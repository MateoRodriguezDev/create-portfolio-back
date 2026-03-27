import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ){}

  /**
   * @description
   * verifica si puede pasar o no el guard
   * @param {ExecutionContext} context 
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    

    if(!token){
      throw new UnauthorizedException()
    }

    try {
      //Verifica el token con la palabra secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN,
      });

      //Guarda una copia del usuario extraido del token en el request
      request.user = payload;
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * @description 
   * Funcion para retirar el token del header
   * @param {Request} request 
   * @returns {string | undefined}
   */
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
