import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateTitleDto {
  @ApiProperty({
    example: 'Desarrollador Backend',
    description: 'Nombre del título',
  })
  @IsString()
  @MaxLength(100)
  titleName: string;

  @ApiProperty({
    example: 'Encargado del desarrollo de APIs y lógica del servidor',
    description: 'Descripción del título',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'URL del ícono del título',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  titleIconURL?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el título está activo',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
