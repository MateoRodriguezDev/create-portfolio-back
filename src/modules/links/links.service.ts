import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Link, Role, User } from '@prisma/client';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    private userProfileService: UserProfileService,
  ) {}

  async createLink(createLinkDto: CreateLinkDto, user: User) {
    // Verifico que el perfil le pertenece al usuario
    const profile = await this.userProfileService.findOneUserProfile(
      createLinkDto.userProfileId,
    );
    await this.isThisMyLink(user, { userProfileId: createLinkDto.userProfileId } as Link);

    return this.prisma.link.create({ data: createLinkDto });
  }

  async findAllLinks() {
    const links = await this.prisma.link.findMany();

    if (!links) throw new NotFoundException('No Link in the database');
    return links;
  }

  async findOneLink(id: number) {
    const link = await this.prisma.link.findUnique({
      where: { id },
    });

    if (!link) throw new NotFoundException('Link Not Found');

    return link;
  }

  async updateLink(id: number, updateLinkDto: UpdateLinkDto, user: User) {
    const link = await this.findOneLink(id);

    await this.isThisMyLink(user, link);

    if (!updateLinkDto) throw new BadRequestException('Empty Body');
    return this.prisma.link.update({ where: { id }, data: updateLinkDto });
  }

  async removeLink(id: number, user: User) {
    const link = await this.findOneLink(id);

    await this.isThisMyLink(user, link);

    return this.prisma.link.delete({ where: { id } });
  }

  async findLinksByUserProfile(userProfileId: number) {
    return await this.prisma.link.findMany({
      where: { userProfileId },
    });
  }

  async isThisMyLink(user: User, link: Link) {
    //Primero reviso si el usuario es admin
    if (user.role === Role.admin) return true;

    //Traigo el perfil del link
    const profile = await this.userProfileService.findOneUserProfile(
      link.userProfileId,
    );

    //Comparo ids del user y del perfil
    if (user.id !== profile.userId)
      throw new ForbiddenException('Not your profile');
  }
}
