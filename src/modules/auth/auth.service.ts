import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UploadFileService } from '../upload-file/upload-file.service';
import { UsersService } from '../users/users.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserProfileResponseDto } from '../user-profile/dto/response/user-profile.response.dto';

@Injectable()
export class AuthService {

  constructor(
    private uploadFileService: UploadFileService,
    private usersService: UsersService,
    private userProfileService: UserProfileService,
  ) { }

  async login(UIDtoken: string): Promise<UserProfileResponseDto> {
    try {
      if (!UIDtoken) {
        throw new Error('Token is missing');
      }
      console.log('Token received:', UIDtoken);

      //Verifico si el token que se recibió de Firebase funciona
      const user = await this.uploadFileService.verifyUID(UIDtoken)
      if(user === null) throw new Error('Missing Token');

      //Verifico si ese usuario existe en mi base de datos
      let userDB = await this.usersService.findOneUserByUid(user.uid)

      //Si no existe le creo una referencia en mi base de datos
      if(!userDB) {
       userDB = await this.usersService.createUserWithProfile({uid: user.uid})
      }

      //Devuelvo el User de mi base de datos al front junto con su perfil
      return await this.userProfileService.getFullUserProfile(userDB.id)

    } catch (error) {
      console.error('Error verifying token:', error);
      throw new BadRequestException('Invalid token')
    }
  }
}
