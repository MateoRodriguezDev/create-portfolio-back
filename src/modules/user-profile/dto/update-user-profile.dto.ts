import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-user-profile.dto';

export class UpdateUserProfileDto extends OmitType(PartialType(CreateUserProfileDto), ['userId'] as const) {}