import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      const categories = await this.prisma.technology.findMany({
            where: {  },
          });
      
          if (!categories) throw new NotFoundException('No Categories in the database');
          return categories;
    }
  
    async findOneTechnology(id: number) {
      const category = await this.prisma.technology.findUnique({
        where: { id },
      });
  
      if (!category) throw new NotFoundException('Category Not Found');
  
      return category;
    }
  
    async updateTechnology(id: number, updateTechnologyDto: UpdateTechnologyDto) {
      await this.findOneTechnology(id);
      
          if (!updateTechnologyDto) throw new BadRequestException('Empty Body');
          return this.prisma.technology.update({ where: { id }, data: updateTechnologyDto });
    }
  
    async removeTechnology(id: number) {
      await this.findOneTechnology(id);
  
      return this.prisma.technology.delete({where: {id}});
    }
}
