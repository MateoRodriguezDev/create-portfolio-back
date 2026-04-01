import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseAdmin } from 'src/firebase-config/firebase.setup';
import { UploadFileModule } from 'src/modules/upload-file/upload-file.module';

@Module({
  imports: [PrismaModule, UploadFileModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
  exports: [UsersService]
})
export class UsersModule {}
