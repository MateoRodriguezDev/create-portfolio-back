import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TitlesService {
  constructor(private prisma: PrismaService) {}

  async createTitle(createTitleDto: CreateTitleDto) {
    return this.prisma.title.create({ data: createTitleDto });
  }

  async findAllTitles() {
    const titles = await this.prisma.title.findMany({
      where: { active: true },
    });

    if (!titles) throw new NotFoundException('No Title in the database');
    return titles;
  }

  async findOneTitle(id: number) {
    const title = await this.prisma.title.findUnique({
      where: { id, active: true },
    });

    if (!title) throw new NotFoundException('Title Not Found');

    return title;
  }

  async updateTitle(id: number, updateTitleDto: UpdateTitleDto) {
    await this.findOneTitle(id);

    if (!updateTitleDto) throw new BadRequestException('Empty Body');
    return this.prisma.title.update({ where: { id }, data: updateTitleDto });
  }

  async removeTitle(id: number) {
    await this.findOneTitle(id);

    return this.prisma.title.update({ where: { id }, data: { active: false } });
  }
}
