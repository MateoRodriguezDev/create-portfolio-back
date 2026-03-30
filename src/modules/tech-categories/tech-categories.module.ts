import { Module } from '@nestjs/common';
import { TechCategoriesService } from './tech-categories.service';
import { TechCategoriesController } from './tech-categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TechCategoriesController],
  providers: [TechCategoriesService],
})
export class TechCategoriesModule {}
