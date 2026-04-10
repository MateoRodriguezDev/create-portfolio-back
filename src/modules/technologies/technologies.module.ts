import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UploadFileModule, UsersModule],
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
})
export class TechnologiesModule {}
