import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsUrl, IsOptional, IsInt } from "class-validator";

export class CreateLinkDto {

    @ApiProperty({
    example: 'https://github.com/usuario',
    description: 'URL del link'
  })
  @IsString()
  @IsUrl()
  url: string;


  @ApiProperty({
    example: 'Mi perfil de GitHub',
    description: 'Descripción del link',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string;


  @ApiProperty({
    example: 1,
    description: 'ID del usuario propietario del link'
  })
  @Transform(({ value }) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? value : parsed;
    })
  @IsInt()
  userProfileId: number;


}
