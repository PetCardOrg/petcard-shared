import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl()
  profile_image_url?: string;
}
