import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({
    example: 'Angular',
    description: 'Nombre de la tecnología',
  })
  @IsString()
  techName: string;

  @ApiProperty({
    example: 'https://angular.io/assets/images/logos/angular/angular.png',
    description: 'URL de la imagen',
  })
  @IsString()
  imgURL: string;

  @ApiProperty({
    example: 'Framework frontend',
    description: 'Descripción de la tecnología',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la categoría tecnológica',
  })
  @IsInt()
  techCategoryId: number;
}
