import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthRolGuard } from '../auth/guard/auth_rol.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tecnología' })
  @ApiResponse({ status: 201, description: 'Tecnología creada exitosamente' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin')
  createTechnology(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologiesService.createTechnology(createTechnologyDto);
  }

  @Get('technologyByCat/:id')
  @ApiOperation({ summary: 'Obtener todas las tecnologías por categoría' })
  @ApiResponse({ status: 200, description: 'Lista de tecnologías' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findAllTechnologiesByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.findAllTechnologiesByCategory(id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tecnologías' })
  @ApiResponse({ status: 200, description: 'Lista de tecnologías' })
  findAllTechnologies() {
    return this.technologiesService.findAllTechnologies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tecnología por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tecnología encontrada' })
  @ApiResponse({ status: 404, description: 'Tecnología no encontrada' })
  findOneTechnology(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.findOneTechnology(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tecnología por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tecnología actualizada' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin')
  updateTechnology(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologiesService.updateTechnology(id, updateTechnologyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tecnología por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tecnología eliminada' })
  @ApiResponse({ status: 404, description: 'Tecnología no encontrada' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin')
  removeTechnology(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.removeTechnology(id);
  }
}
