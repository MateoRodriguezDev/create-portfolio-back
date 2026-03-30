import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTechCategoryDto {
  @ApiProperty({
    example: 'Frontend',
    description: 'Nombre de la categoría tecnológica',
  })
  @IsString()
  techCategoryName: string;

  @ApiProperty({
    example: 'https://example.com/icon.png',
    description: 'URL de la imagen',
    required: false,
  })
  @IsOptional()
  @IsString()
  imgURL?: string;

  @ApiProperty({
    example: 'Tecnologías del lado del cliente',
    description: 'Descripción de la categoría',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si la categoría está activa',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
