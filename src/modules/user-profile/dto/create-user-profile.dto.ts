import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsUrl, IsInt, IsBoolean } from 'class-validator';

export class CreateUserProfileDto {
  @ApiProperty({
    example: 1,
    description: 'ID usuario',
    required: true,
  })
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? value : parsed;
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 'Juan Perez',
    description: 'Nombre completo del usuario',
    required: false,
  })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'juanPerez2006', description: 'Nombre de usuario', required: false, })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'https://...',
    description: 'URL de la imagen de perfil',
    required: false,
  })
  @IsOptional()
  @IsString()
  profilePictureURL: string;

    @ApiProperty({
    example: 'https://...',
    description: 'URL del fondo del perfil',
    required: false,
  })
  @IsOptional()
  @IsString()
  backgroundURL: string;

  @ApiProperty({
    example: 1,
    description: 'ID del título del perfil',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? value : parsed;
  })
  @IsInt()
  @IsOptional()
  titleId?: number | null;

  @ApiProperty({
    example: true,
    description: 'Indica si el perfil está activo',
    required: false,
    default: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value; // Si ya es booleano, lo deja tal cual
  })
  @IsBoolean()
  active?: boolean;
}
