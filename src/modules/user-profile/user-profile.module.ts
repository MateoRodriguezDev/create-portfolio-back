import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileModule } from 'src/modules/upload-file/upload-file.module';

@Module({
  imports: [PrismaModule, UploadFileModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService]
})
export class UserProfileModule {}
