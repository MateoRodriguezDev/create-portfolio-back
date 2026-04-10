import { Exclude, Expose, Type } from 'class-transformer';

// export class TechCategoryResponseDto {
//   @Expose() id: number;
//   @Expose() techCategoryName: string;
//   @Expose() imgURL: string;
// }

export class TechnologyResponseDto {
  @Expose() id: number;
  @Expose() techName: string;
  @Expose() imgURL: string;
  @Expose() descripcion: string;

}

export class ProjectTechnologyResponseDto {
  @Expose()
  @Type(() => TechnologyResponseDto)
  technology: TechnologyResponseDto;
}

export class ProjectResponseDto {
  @Expose() id: number;
  @Expose() projectName: string;
  @Expose() imgURL: string;
  @Expose() descripcion: string;

  @Expose()
  @Type(() => ProjectTechnologyResponseDto)
  technologies: ProjectTechnologyResponseDto[];
}

export class LinkResponseDto {
  @Expose() id: number;
  @Expose() url: string;
  @Expose() descripcion: string;
}

export class TitleResponseDto {
  @Expose() id: number;
  @Expose() titleName: string;
  @Expose() descripcion: string;
  @Expose() titleIconURL: string;
}

export class UserProfileResponseDto {
  @Expose() id: number;
  @Expose() fullName: string;
  @Expose() userName: string;
  @Expose() profilePictureURL: string;

  @Expose()
  @Type(() => TitleResponseDto)
  title: TitleResponseDto;

  @Expose()
  @Type(() => LinkResponseDto)
  links: LinkResponseDto[];

  @Expose()
  @Type(() => ProjectResponseDto)
  projects: ProjectResponseDto[];
}