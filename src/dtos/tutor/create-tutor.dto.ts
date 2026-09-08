import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { NormalizeEmail } from '../../validators/normalize-email.validator';

export class CreateTutorDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  profile_image_url?: string;
}
