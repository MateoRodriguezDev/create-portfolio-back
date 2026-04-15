import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-user-profile.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserProfileDto extends OmitType(
  PartialType(CreateUserProfileDto),
  ['userId'] as const,
) {
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  removeBackground?: boolean;
}
