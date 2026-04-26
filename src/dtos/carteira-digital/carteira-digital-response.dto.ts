import { Species } from '../../enums/species.enum';
import { Sex } from '../../enums/sex.enum';

export class CarteiraDigitalResponseDto {
  pet_id!: string;
  pet_name!: string;
  species!: Species;
  breed?: string;
  sex!: Sex;
  birth_date?: string;
  photo_url?: string;
  qr_code_url?: string;
  tutor_id!: string;
  tutor_name!: string;
  vaccines_count!: number;
  dewormings_count!: number;
  medications_count!: number;
  issued_at!: Date;
}
