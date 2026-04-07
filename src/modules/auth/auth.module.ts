import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.TOKEN || 'secreto',
    signOptions: { expiresIn: "1d" },
  }),
    UsersModule, PrismaModule, UploadFileModule, UserProfileModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
