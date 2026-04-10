import { Module } from '@nestjs/common';
import { TitlesService } from './titles.service';
import { TitlesController } from './titles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UploadFileModule, UsersModule],
  controllers: [TitlesController],
  providers: [TitlesService],
  exports: [TitlesService]
})
export class TitlesModule {}
