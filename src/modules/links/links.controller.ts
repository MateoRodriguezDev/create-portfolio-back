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

import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthRolGuard } from '../auth/guard/auth_rol.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { User } from '@prisma/client';
import { GetUser } from '../auth/decorators/getParam.decorator';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo link' })
  @ApiResponse({ status: 201, description: 'Link creado exitosamente' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  createLink(@Body() createLinkDto: CreateLinkDto, @GetUser() user: User) {
    return this.linksService.createLink(createLinkDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los links' })
  @ApiResponse({ status: 200, description: 'Lista de links' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin')
  findAllLink() {
    return this.linksService.findAllLinks();
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Obtener links por usuario' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Links del usuario' })
  findLinksByUserProfile(@Param('userId', ParseIntPipe) userProfileId: number) {
    return this.linksService.findLinksByUserProfile(userProfileId);
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
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  updateLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLinkDto: UpdateLinkDto,
    @GetUser() user: User,
  ) {
    return this.linksService.updateLink(id, updateLinkDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un link por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Link eliminado' })
  @ApiResponse({ status: 404, description: 'Link no encontrado' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.linksService.removeLink(id, user);
  }
}
