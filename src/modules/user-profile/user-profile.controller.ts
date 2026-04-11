import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  SerializeOptions,
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
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AuthRolGuard } from '../auth/guard/auth_rol.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { User } from '@prisma/client';
import { GetUser } from '../auth/decorators/getParam.decorator';

@ApiTags('User Profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perfil de usuario' })
  @ApiResponse({ status: 201, description: 'Perfil creado exitosamente' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  createUserProfile(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @UploadedFile() file?: Express.Multer.File,
    @UploadedFile() file2?: Express.Multer.File,
  ) {
    return this.userProfileService.createUserProfile(
      createUserProfileDto,
      file,
      file2,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los perfiles de usuario' })
  @ApiResponse({ status: 200, description: 'Lista de perfiles' })
  findAllUserProfiles() {
    return this.userProfileService.findAllUserProfiles();
  }

  //Funcion para traer todo el perfil del usuario
  @Get('fullProfile/:id')
  @ApiOperation({
    summary:
      'Obtener el perfil completo de un usuario con título, links y proyectos',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Perfil completo encontrado' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  @SerializeOptions({ excludeExtraneousValues: true })
  getFullUserProfile(@Param('id', ParseIntPipe) id: string) {
    return this.userProfileService.getFullUserProfile(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perfil de usuario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Perfil encontrado' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  findOneUserProfile(@Param('id', ParseIntPipe) id: string) {
    return this.userProfileService.findOneUserProfile(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un perfil de usuario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  updateUserProfile(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @GetUser() user: User,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      return this.userProfileService.updateUserProfile(
        +id,
        updateUserProfileDto,
        user,
        file,
      );
    }
    return this.userProfileService.updateUserProfile(+id, updateUserProfileDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perfil de usuario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Perfil eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(AuthGuard, AuthRolGuard)
  @Roles('admin', 'user')
  removeUserProfile(@Param('id', ParseIntPipe) id: string, @GetUser() user: User,) {
    return this.userProfileService.removeUserProfile(+id, user);
  }
}
