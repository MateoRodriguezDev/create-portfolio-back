import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TechnologiesService {
  constructor(private prisma: PrismaService) {}

  async createTechnology(createTechnologyDto: CreateTechnologyDto) {
    return await this.prisma.technology.create({ data: createTechnologyDto });
  }

  async findAllTechnologies() {
    const technologies = await this.prisma.technology.findMany({
      where: {},
    });

    if (technologies.length === 0)
      throw new NotFoundException('No technologies in the database');
    return technologies;
  }

  async findOneTechnology(id: number) {
    const technology = await this.prisma.technology.findUnique({
      where: { id },
    });

    if (!technology) throw new NotFoundException('Technology Not Found');

    return technology;
  }

  async updateTechnology(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    await this.findOneTechnology(id);

    if (!updateTechnologyDto) throw new BadRequestException('Empty Body');
    return this.prisma.technology.update({
      where: { id },
      data: updateTechnologyDto,
    });
  }

  async removeTechnology(id: number) {
    await this.findOneTechnology(id);

    return this.prisma.technology.delete({ where: { id } });
  }

  async findAllTechnologiesByCategory(techCategoryId: number) {
    const technologies = await this.prisma.technology.findMany({
      where: {
        techCategoryId
      },
    });

    if (technologies.length === 0)
      throw new NotFoundException('No technologies in the database');
    return technologies;
  }
}
