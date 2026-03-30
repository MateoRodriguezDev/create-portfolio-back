import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginAuthDto {

    @ApiProperty({ example: 'juan.perez@mail.com', description: 'Correo del usuario' })
    @IsEmail()
    email: string;


    @ApiProperty({ example: '123456', description: 'Password del usuario' })
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;
}
