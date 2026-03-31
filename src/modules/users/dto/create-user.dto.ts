import { IsString, IsEmail, MinLength, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'juan.perez@mail.com', description: 'Correo electrónico válido' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'user', description: 'Rol del usuario', required: false, default: 'user' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo', required: false, default: true })
  @IsOptional()
  @Transform(({ value }) => {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true'; // Convierte "true" a `true` y cualquier otra cosa a `false`
      }
      return value; // Si ya es booleano, lo deja tal cual
    })
  @IsBoolean()
  active?: boolean;
}