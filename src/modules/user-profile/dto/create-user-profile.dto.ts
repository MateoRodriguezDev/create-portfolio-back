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
  })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'juanPerez2006', description: 'Nombre de usuario' })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'https://...',
    description: 'URL de la imagen de perfil',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  profilePictureURL: string;

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
  titleId: number;

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
