import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TitlesModule } from './titles/titles.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TitlesModule],
})
export class AppModule {}
