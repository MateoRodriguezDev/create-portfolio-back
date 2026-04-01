import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TitlesModule } from './modules/titles/titles.module';
import { LinksModule } from './modules/links/links.module';
import { TechCategoriesModule } from './modules/tech-categories/tech-categories.module';
import { TechnologiesModule } from './modules/technologies/technologies.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { UploadFileModule } from './modules/upload-file/upload-file.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TitlesModule,
    LinksModule,
    TechCategoriesModule,
    TechnologiesModule,
    ProjectsModule,
    UploadFileModule,
    UserProfileModule,
  ],
  providers: [],
})
export class AppModule {}
