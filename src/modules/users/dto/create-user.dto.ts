import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Perez', description: 'Nombre del usuario' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'juanPerez2006', description: 'Nombre del usuario' })
  @IsString()
  userName: string;

  @ApiProperty({
    example:
      'https://raw.githubusercontent.com/devicons/devicon/670a611ad1c3e057ee385168d65c8ab27a7e1be5/icons/archlinux/archlinux-original.svg',
    description: 'URL de la imagen de perfil',
  })
  @IsUrl()
  @IsOptional()
  profilePictureURL: string;

  @ApiProperty({
    example: 'user',
    description: 'Rol del usuario',
    required: false,
    default: 'user',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    example: 'juan.perez@mail.com',
    description: 'Correo electrónico válido',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ example: 1, description: 'ID del titulo del usuario' })
  @Transform(({ value }) => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? value : parsed; 
})
  @IsInt()
  titleId: number;
}
