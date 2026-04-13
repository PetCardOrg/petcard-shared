import { Species } from '../../enums/species.enum';
import { Sex } from '../../enums/sex.enum';

export class PetResponseDto {
  id!: string;
  name!: string;
  species!: Species;
  breed?: string;
  sex!: Sex;
  birth_date?: string;
  weight?: number;
  photo_url?: string;
  tutor_id!: string;
  created_at!: Date;
  updated_at!: Date;
}
