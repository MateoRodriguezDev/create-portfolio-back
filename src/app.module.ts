import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TitlesModule } from './titles/titles.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TitlesModule, LinksModule],
})
export class AppModule {}
