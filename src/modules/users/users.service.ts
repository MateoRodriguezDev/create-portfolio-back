import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/helpers/bcrypt.helper';
import { UploadFileService } from 'src/modules/upload-file/upload-file.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private readonly uploadService: UploadFileService) {}

  

  async createUser(createUserDto: CreateUserDto, file: Express.Multer.File) {
    createUserDto.password = await hashPassword(createUserDto.password);

    //Subo la imagen y agrego su url al DTO
    if (file) {
      const url = await this.uploadService.uploadIMG(file, 'users/profiles');
    createUserDto.profilePictureURL = url;
    }

    return this.prisma.user.create({ data: createUserDto });
  }

  async findAllUsers() {
    const users = await this.prisma.user.findMany({
      where: { active: true },
      include: {
        title: {
          select: {
            id: true,
            titleName: true,
            titleIconURL: true,
          },
        },
      },
    });

    if (!users) throw new NotFoundException('No Users in the database');
    return users;
  }

  async findOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id, active: true },
      include: {
        title: {
          select: {
            id: true,
            titleName: true,
            titleIconURL: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneUser(id);

    //Hasheo la contraseña si es que se cambio
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    if (!updateUserDto) throw new BadRequestException('Empty Body');
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async removeUser(id: number) {
    const user = await this.findOneUser(id);

    //Elimino la imagen del perfil del usuario
    this.uploadService.deleteImg(user.profilePictureURL)

    return this.prisma.user.update({ where: { id }, data: { active: false } });
  }



  


}



