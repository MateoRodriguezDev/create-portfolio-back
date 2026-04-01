import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo link' })
  @ApiResponse({ status: 201, description: 'Link creado exitosamente' })
  createLink(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.createLink(createLinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los links' })
  @ApiResponse({ status: 200, description: 'Lista de links' })
  findAllLink() {
    return this.linksService.findAllLinks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un link por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Link encontrado' })
  @ApiResponse({ status: 404, description: 'Link no encontrado' })
  findOneLink(@Param('id', ParseIntPipe) id: number) {
    return this.linksService.findOneLink(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un link por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Link actualizado' })
  updateLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linksService.updateLink(id, updateLinkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un link por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Link eliminado' })
  @ApiResponse({ status: 404, description: 'Link no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.linksService.removeLink(id);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Obtener links por usuario' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Links del usuario' })
  findLinksByUserProfile(@Param('userId', ParseIntPipe) userProfileId: number) {
    return this.linksService.findLinksByUserProfile(userProfileId);
  }
}
