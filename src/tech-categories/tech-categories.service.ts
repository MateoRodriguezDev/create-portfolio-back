import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTechCategoryDto } from './dto/create-tech-category.dto';
import { UpdateTechCategoryDto } from './dto/update-tech-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TechCategory } from './entities/tech-category.entity';

@Injectable()
export class TechCategoriesService {

  constructor(private prisma: PrismaService) {}

  async createCategory(createTechCategoryDto: CreateTechCategoryDto) {
    return await this.prisma.techCategory.create({ data: createTechCategoryDto });
  }

  async findAllCategories() {
    const categories = await this.prisma.techCategory.findMany({
          where: { active: true },
        });
    
        if (!categories) throw new NotFoundException('No Categories in the database');
        return categories;
  }

  async findOneCategory(id: number) {
    const category = await this.prisma.techCategory.findUnique({
      where: { id, active: true },
    });

    if (!category) throw new NotFoundException('Category Not Found');

    return category;
  }

  async updateCategory(id: number, updateTechCategoryDto: UpdateTechCategoryDto) {
    await this.findOneCategory(id);
    
        if (!updateTechCategoryDto) throw new BadRequestException('Empty Body');
        return this.prisma.techCategory.update({ where: { id }, data: updateTechCategoryDto });
  }

  async removeCategory(id: number) {
    await this.findOneCategory(id);

    return this.prisma.techCategory.update({ where: { id }, data: { active: false } });
  }
}
