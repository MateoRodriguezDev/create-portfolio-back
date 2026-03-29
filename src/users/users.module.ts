import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseAdmin } from 'src/firebase-config/firebase.setup';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, FirebaseAdmin],
  exports: [UsersService]
})
export class UsersModule {}
