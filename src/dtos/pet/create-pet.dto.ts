import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Species } from '../../enums/species.enum';
import { Sex } from '../../enums/sex.enum';

export class CreatePetDto {
  @IsString()
  name!: string;

  @IsEnum(Species)
  species!: Species;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsEnum(Sex)
  sex!: Sex;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsUrl()
  photo_url?: string;

  @IsUUID()
  tutor_id!: string;
}
