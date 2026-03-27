import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TitlesModule } from './titles/titles.module';
import { LinksModule } from './links/links.module';
import { TechCategoriesModule } from './tech-categories/tech-categories.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TitlesModule, LinksModule, TechCategoriesModule, TechnologiesModule, ProjectsModule],
})
export class AppModule {}
