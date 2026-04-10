import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileService } from 'src/modules/upload-file/upload-file.service';
import { UserProfileResponseDto } from './dto/response/user-profile.response.dto';
import { plainToInstance } from 'class-transformer';
import { Role, User } from '@prisma/client';
import { Profile } from 'src/types';

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

    if (!userProfiles.length)
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
    user: User,
    file?: Express.Multer.File,
  ) {
    const profile = await this.findOneUserProfile(id);

    await this.isThisMyProfile(user, profile);

    //Verifico si mando un titulo valido
    if (updateUserProfileDto.titleId) {
      const title = await this.prisma.title.findUnique({
        where: { id: updateUserProfileDto.titleId },
      });
      if (!title) updateUserProfileDto.titleId = null;
    }

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

  async removeUserProfile(id: number, user: User) {
    const profile = await this.findOneUserProfile(id);

    await this.isThisMyProfile(user, profile);

    //Elimino la imagen del perfil del usuario
    this.uploadService.deleteImg(profile.profilePictureURL);

    return this.prisma.userProfile.update({
      where: { id },
      data: { active: false },
    });
  }

  //Función para traer el perfil entero con el id del usuario
  async getFullUserProfile(userId: number) {
    const profile = await this.prisma.userProfile.findFirst({
      where: { userId },
      include: {
        title: true,
        links: true,
        projects: {
          where: { active: true },
          include: {
            technologies: {
              include: {
                technology: true,
              },
            },
          },
        },
      },
    });

    if (!profile) throw new NotFoundException('Profile Not Found');

    return plainToInstance(UserProfileResponseDto, profile, {
      excludeExtraneousValues: true,
    });
  }

  async isThisMyProfile(user: User, profile: Profile) {
    //Primero reviso si el usuario es admin
    if (user.role === Role.admin) return true;

    //Si no es admin, reviso si el perfil le pertenece al usuario
    if (user.id !== profile.userId)
      throw new ForbiddenException('Not your profile');
  }
}
