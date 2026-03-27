import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam
} from '@nestjs/swagger';

import { TitlesService } from './titles.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Titles')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo título' })
  @ApiResponse({ status: 201, description: 'Título creado exitosamente' })
  createTitle(@Body() createTitleDto: CreateTitleDto) {
    return this.titlesService.createTitle(createTitleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los títulos' })
  @ApiResponse({ status: 200, description: 'Lista de títulos' })
  findAllTitles() {
    return this.titlesService.findAllTitles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un título por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Título encontrado' })
  @ApiResponse({ status: 404, description: 'Título no encontrado' })
  findOneTitle(@Param('id', ParseIntPipe) id: number) {
    return this.titlesService.findOneTitle(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un título por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Título actualizado' })
  updateTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTitleDto: UpdateTitleDto,
  ) {
    return this.titlesService.updateTitle(id, updateTitleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un título por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Título eliminado' })
  @ApiResponse({ status: 404, description: 'Título no encontrado' })
  removeTitle(@Param('id', ParseIntPipe) id: number) {
    return this.titlesService.removeTitle(id);
  }
}