import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

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
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'ID de la tecnología utilizada',
  })
  @IsInt()
  technologyId: number;

  @ApiProperty({
      example: true,
      description: 'Indica si la categoría está activa',
      required: false,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
