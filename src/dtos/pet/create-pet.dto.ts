import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Species } from '../../enums/species.enum';
import { Sex } from '../../enums/sex.enum';

export class CreatePetDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsEnum(Species)
  species!: Species;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  breed?: string;

  @IsEnum(Sex)
  sex!: Sex;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  /** Em kg. Faixa cobre de um filhote de ave (10g) a um cão de raça gigante. */
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  @Max(120)
  weight?: number;

  @IsOptional()
  @IsUrl()
  photo_url?: string;
}
