import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UserProfileModule, UploadFileModule, UsersModule], 
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService]
})
export class LinksModule {}
