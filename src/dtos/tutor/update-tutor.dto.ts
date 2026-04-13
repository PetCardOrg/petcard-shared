import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateTutorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl()
  profile_image_url?: string;
}
