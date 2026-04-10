import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UploadFileService } from '../upload-file/upload-file.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Project, Role, User } from '@prisma/client';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private readonly uploadService: UploadFileService,
    private userProfileService: UserProfileService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    file: Express.Multer.File,
    user: User,
  ) {
    const { technologyIds, ...projectData } = createProjectDto;

    // Verifico que el perfil le pertenece al usuario
    const profile = await this.userProfileService.findOneUserProfile(
      createProjectDto.userProfileId,
    );
    await this.isThisMyProject(user, { userProfileId: createProjectDto.userProfileId } as Project);

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
          include: { technology: true }, 
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
    user: User,
    file?: Express.Multer.File,
  ) {
    const { technologyIds, ...projectData } = updateProjectDto;

    const project = await this.findOneProject(id);

    await this.isThisMyProject(user, project);

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

  async removeProject(id: number, user: User) {
    const project = await this.findOneProject(id);

    await this.isThisMyProject(user, project);

    //Elimino la imagen del proyecto
    this.uploadService.deleteImg(project.imgURL);

    return this.prisma.project.update({
      where: { id },
      data: { active: false },
    });
  }

  async isThisMyProject(user: User, project: Project) {
    //Primero reviso si el usuario es admin
    if (user.role === Role.admin) return true;
    console.log(user.role)

    //Traigo el perfil del projecto
    const profile = await this.userProfileService.findOneUserProfile(
      project.userProfileId,
    );

    //Comparo ids del user y del perfil
    if (user.id !== profile.userId)
      throw new ForbiddenException('Not your profile');
  }
}
