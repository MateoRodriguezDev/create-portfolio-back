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
  constructor(
    private prisma: PrismaService,
    private readonly uploadService: UploadFileService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async createUserWithProfile(createUserDto: CreateUserDto) {
  return this.prisma.user.create({
    data: {
      ...createUserDto,
      profile: {
        create: {
          fullName: '',
          userName: '',
          profilePictureURL: '',
        }
      }
    }
  });
}

  async findAllUsers() {
    const users = await this.prisma.user.findMany({
      where: { active: true },
    });

    if (!users) throw new NotFoundException('No Users in the database');
    return users;
  }

  async findOneUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id, active: true },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async findOneUserByUid(uid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uid, active: true },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneUserById(id);

   

    if (!updateUserDto) throw new BadRequestException('Empty Body');
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async removeUser(id: number) {
    const user = await this.findOneUserById(id);

    return this.prisma.user.update({ where: { id }, data: { active: false } });
  }
}
