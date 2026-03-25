import { IsString, IsEmail, MinLength, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Perez', description: 'Nombre del usuario' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'juanPerez2006', description: 'Nombre del usuario' })
  @IsString()
  userName: string;

  @ApiProperty({ example: 'user', description: 'Rol del usuario', required: false, default: 'user' })
  @IsString()
  role?: Role;

  @ApiProperty({ example: 'juan.perez@mail.com', description: 'Correo electrónico válido' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
