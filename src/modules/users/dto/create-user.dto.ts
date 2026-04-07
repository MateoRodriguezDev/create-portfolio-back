import { IsString, IsEmail, MinLength, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  

  @ApiProperty({ example: '', description: 'UID del usuario en firebase', required: true, default: 'user' })
  @IsString()
  uid: string;

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