import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UploadFileService } from '../upload-file/upload-file.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private readonly uploadService: UploadFileService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    file: Express.Multer.File,
  ) {
    const { technologyIds, ...projectData } = createProjectDto;

    //Subo la imagen y agrego su url al DTO
    if (file) {
      const url = await this.uploadService.uploadIMG(file, 'users/projects');
      projectData.imgURL = url;
    }

    return this.prisma.project.create({
      data: {
        ...projectData,
        technologies: {
          create: technologyIds.map((technologyId) => ({ technologyId })),
        },
      },
      include: {
        technologies: {
          include: { technology: true }, // 👈
        },
      },
    });
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

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
    file?: Express.Multer.File,
  ) {
    const { technologyIds, ...projectData } = updateProjectDto;

    const project = await this.findOneProject(id);

    //Actualizo la imagen del proyecto si se trajo una
    if (file) {
      //Borro la anterior
      this.uploadService.deleteImg(project.imgURL);

      const url = await this.uploadService.uploadIMG(file, 'users/projects');

      projectData.imgURL = url;
    }

    if (!updateProjectDto) throw new BadRequestException('Empty Body');

    console.log(updateProjectDto.imgURL);
    return this.prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        technologies: technologyIds
          ? {
              deleteMany: {},
              create: technologyIds.map((technologyId) => ({ technologyId })),
            }
          : undefined,
      },
      include: {
        technologies: {
          include: { technology: true }, // 👈
        },
      },
    });
  }

  async removeProject(id: number) {
    const project = await this.findOneProject(id);

    //Elimino la imagen del proyecto
    this.uploadService.deleteImg(project.imgURL);

    return this.prisma.project.update({
      where: { id },
      data: { active: false },
    });
  }
}
