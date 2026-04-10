import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UploadFileService } from 'src/modules/upload-file/upload-file.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private uploadFileService: UploadFileService,
    private usersService: UsersService,
  ) {}

  /**
   * @description
   * verifica si puede pasar o no el guard
   * @param {ExecutionContext} context
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verifico el token
      const firebaseUser = await this.uploadFileService.verifyUID(token);

      // Busco el usuario en mi DB
      if(firebaseUser === null) throw new Error('Token Error')
      const userDB = await this.usersService.findOneUserByUid(firebaseUser.uid);

      // Guardo el usuario completo en el request
      request.user = userDB;
    } catch (error) {
      console.log(error);
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
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
