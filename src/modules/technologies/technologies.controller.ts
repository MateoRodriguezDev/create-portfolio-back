import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam
} from '@nestjs/swagger';

import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tecnología' })
  @ApiResponse({ status: 201, description: 'Tecnología creada exitosamente' })
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
  updateTechnology(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnologyDto: UpdateTechnologyDto
  ) {
    return this.technologiesService.updateTechnology(id, updateTechnologyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tecnología por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tecnología eliminada' })
  @ApiResponse({ status: 404, description: 'Tecnología no encontrada' })
  removeTechnology(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.removeTechnology(id);
  }
}