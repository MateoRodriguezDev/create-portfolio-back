import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UploadFileService } from '../upload-file/upload-file.service';
import { UsersService } from '../users/users.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserProfileResponseDto } from '../user-profile/dto/response/user-profile.response.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private uploadFileService: UploadFileService,
    private usersService: UsersService,
    private userProfileService: UserProfileService,
  ) {}

  async login(UIDtoken: string): Promise<{profileId : number}> {
    try {
      if (!UIDtoken) {
        throw new Error('Token is missing');
      }

      //Verifico si el token que se recibió de Firebase funciona
      const user = await this.uploadFileService.verifyUID(UIDtoken);
      if (user === null) throw new Error('Missing Token');

      let userDB:User;

      try {
        userDB = await this.usersService.findOneUserByUid(user.uid);
      } catch (error) {
        if (error instanceof NotFoundException) {
          // Si no existe lo creamos
          userDB = await this.usersService.createUserWithProfile({
            uid: user.uid,
          });
        } else {
          throw error; // cualquier otro error lo relanzamos
        }
      }

      //Devuelvo el id del perfil del usuario
      /**
       * TODO: Ahora mismo trae todo el perifl innecesariamente para solo envíar el ID. Hacer un endpoint dentro del userProfileService que solo te traiga el id del perfil según el id del usuario
       * 
       */
      const profile = await this.userProfileService.getFullUserProfile(userDB.id);
      return {profileId: profile.id}
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new BadRequestException('Invalid token');
    }
  }
}
