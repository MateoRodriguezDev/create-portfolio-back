import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthRolGuard } from '../auth/guard/auth_rol.guard';
import type { User } from '@prisma/client';
import { GetUser } from '../auth/decorators/getParam.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.projectsService.createProject(createProjectDto, file, user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos' })
  findAll() {
    return this.projectsService.findAllProjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOneProject(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      return this.projectsService.updateProject(
        id,
        updateProjectDto,
        user,
        file,
      );
    }
    return this.projectsService.updateProject(id, updateProjectDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.projectsService.removeProject(id, user);
  }
}
