import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async createLink(createLinkDto: CreateLinkDto) {
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

  async updateLink(id: number, updateLinkDto: UpdateLinkDto) {
    await this.findOneLink(id);

    if (!updateLinkDto) throw new BadRequestException('Empty Body');
    return this.prisma.link.update({ where: { id }, data: updateLinkDto });
  }

  async removeLink(id: number) {
    await this.findOneLink(id);

    return this.prisma.link.delete({ where: { id } });
  }

  findLinksByUser(userId: number) {
    return this.prisma.link.findMany({
      where: { userId },
    });
  }
}
