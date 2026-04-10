import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UploadFileModule, UserProfileModule, UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
