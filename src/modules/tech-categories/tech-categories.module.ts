import { Module } from '@nestjs/common';
import { TechCategoriesService } from './tech-categories.service';
import { TechCategoriesController } from './tech-categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UploadFileModule, UsersModule],
  controllers: [TechCategoriesController],
  providers: [TechCategoriesService],
})
export class TechCategoriesModule {}
