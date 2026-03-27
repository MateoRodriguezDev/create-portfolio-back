import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
 
   async createProject(createProjectDto: CreateProjectDto) {
     return await this.prisma.project.create({ data: createProjectDto });
   }
 
   async findAllProjects() {
     const projects = await this.prisma.project.findMany({
           where: { active: true },
         });
     
         if (!projects) throw new NotFoundException('No Projects in the database');
         return projects;
   }
 
   async findOneProject(id: number) {
     const project = await this.prisma.project.findUnique({
       where: { id, active: true },
     });
 
     if (!project) throw new NotFoundException('Project Not Found');
 
     return project;
   }
 
   async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
     await this.findOneProject(id);
     
         if (!updateProjectDto) throw new BadRequestException('Empty Body');
         return this.prisma.project.update({ where: { id }, data: updateProjectDto });
   }
 
   async removeProject(id: number) {
     await this.findOneProject(id);
 
     return this.prisma.project.update({ where: { id }, data: { active: false } });
   }
}
