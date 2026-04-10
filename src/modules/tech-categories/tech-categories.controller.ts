import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { TechCategoriesService } from './tech-categories.service';
import { CreateTechCategoryDto } from './dto/create-tech-category.dto';
import { UpdateTechCategoryDto } from './dto/update-tech-category.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthRolGuard } from '../auth/guard/auth_rol.guard';

@ApiTags('Tech Categories')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiForbiddenResponse({ description: 'Forbidden.' })
@UseGuards(AuthGuard, AuthRolGuard)
@Controller('tech-categories')
export class TechCategoriesController {
  constructor(private readonly techCategoriesService: TechCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría tecnológica' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @Roles('admin')
  createCategory(@Body() createTechCategoryDto: CreateTechCategoryDto) {
    return this.techCategoriesService.createCategory(createTechCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías tecnológicas' })
  @ApiResponse({ status: 200, description: 'Lista de categorías' })
  @Roles('admin', 'user')
  findAllCategories() {
    return this.techCategoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Roles('admin', 'user')
  findOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.techCategoriesService.findOneCategory(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría actualizada' })
  @Roles('admin')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechCategoryDto: UpdateTechCategoryDto
  ) {
    return this.techCategoriesService.updateCategory(id, updateTechCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría eliminada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Roles('admin')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.techCategoriesService.removeCategory(id);
  }
}