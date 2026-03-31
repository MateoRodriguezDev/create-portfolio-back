import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileService } from 'src/modules/upload-file/upload-file.service';
import { UserProfileResponseDto } from './dto/response/user-profile.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserProfileService {
  constructor(
    private prisma: PrismaService,
    private readonly uploadService: UploadFileService,
  ) {}

  async createUserProfile(
    createUserProfileDto: CreateUserProfileDto,
    file: Express.Multer.File,
  ) {
    createUserProfileDto.profilePictureURL = '';

    //Subo la imagen y agrego su url al DTO
    if (file) {
      const url = await this.uploadService.uploadIMG(file, 'users/profiles');
      createUserProfileDto.profilePictureURL = url;
    }

    return this.prisma.userProfile.create({ data: createUserProfileDto });
  }

  async findAllUserProfiles() {
    const userProfiles = await this.prisma.userProfile.findMany({
      where: { active: true },
    });

    if (!userProfiles)
      throw new NotFoundException('No Profiles in the database');
    return userProfiles;
  }

  async findOneUserProfile(id: number) {
    const userProfiles = await this.prisma.userProfile.findUnique({
      where: { id, active: true },
    });

    if (!userProfiles) throw new NotFoundException('Profile Not Found');

    return userProfiles;
  }

  async updateUserProfile(
    id: number,
    updateUserProfileDto: UpdateUserProfileDto,
    file?: Express.Multer.File,
  ) {
    const profile = await this.findOneUserProfile(id);


    //Actualizo la imagen de perfil si se trajo una
    if (file) {
      //Borro la anterior
      this.uploadService.deleteImg(profile.profilePictureURL);

      const url = await this.uploadService.uploadIMG(file, 'users/profiles');
      updateUserProfileDto.profilePictureURL = url;
    }

    if (!updateUserProfileDto) throw new BadRequestException('Empty Body');
    return this.prisma.userProfile.update({
      where: { id },
      data: updateUserProfileDto,
    });
  }

  async removeUserProfile(id: number) {
    const profile = await this.findOneUserProfile(id);

    //Elimino la imagen del perfil del usuario
    this.uploadService.deleteImg(profile.profilePictureURL);

    return this.prisma.userProfile.update({
      where: { id },
      data: { active: false },
    });
  }








  //Función para traer el perfil entero
  async getFullUserProfile(userProfileId: number) {
  const profile = await this.prisma.userProfile.findUnique({
    where: { id: userProfileId },
    include: {
      title: true,
      links: true,
      projects: {
        include: {
          technologies: {
            include: {
              technology: true
            }
          }
        }
      }
    }
  });

  return plainToInstance(UserProfileResponseDto, profile, {
    excludeExtraneousValues: true, // 👈 solo expone los campos con @Expose()
  });
}




}
