import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsArray,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Portfolio Web',
    description: 'Nombre del proyecto',
  })
  @IsString()
  projectName: string;

  @ApiProperty({
    example: 'https://example.com/project.png',
    description: 'Imagen del proyecto',
  })
  @IsString()
  @IsOptional()
  imgURL: string;

  @ApiProperty({
    example: 'Aplicación web personal',
    description: 'Descripción del proyecto',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario propietario',
  })
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? value : parsed;
  })
  @IsInt()
  userProfileId: number;

  @ApiProperty({
    example: true,
    description: 'Indica si la categoría está activa',
    required: false,
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

  @ApiProperty({
    example: true,
    description: 'Indica si es un proyecto de arte',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value; // Si ya es booleano, lo deja tal cual
  })
  @IsBoolean()
  displayArt?: boolean;

  @ApiProperty({
    example: 'https://github.com/usuario',
    description: 'Es el url del proyecto',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return `https://${value}`;
    }
    return value;
  })
  @IsString()
  @IsUrl()
  projectURL?: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs de las tecnologías utilizadas',
  })
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    // Si llega como string JSON: '["1", "2", "3"]'
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(Number) : [Number(parsed)];
      } catch {
        return [Number(value)];
      }
    }
    // Si llega como array normal: ["1", "2", "3"]
    return Array.isArray(value) ? value.map(Number) : [Number(value)];
  })
  technologyIds: number[];
}
