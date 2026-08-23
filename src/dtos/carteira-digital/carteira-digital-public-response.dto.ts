import { Species } from '../../enums/species.enum';
import { Sex } from '../../enums/sex.enum';
import { VaccineRecordResponseDto } from '../vaccine/vaccine-record-response.dto';
import { DewormingRecordResponseDto } from '../deworming/deworming-record-response.dto';
import { MedicationRecordResponseDto } from '../medication/medication-record-response.dto';

export class CarteiraDigitalPublicResponseDto {
  pet_id!: string;
  pet_name!: string;
  species!: Species;
  breed?: string;
  sex!: Sex;
  birth_date?: string;
  weight?: number;
  photo_url?: string;
  qr_code_url?: string;
  tutor_name!: string;
  /**
   * Telefone do tutor, quando cadastrado.
   *
   * Vai numa carteira pública de propósito: é o caso de uso do QR na coleira
   * — quem acha o pet perdido precisa conseguir ligar para o dono. Só é
   * exposto se o tutor tiver preenchido o campo; o cadastro não o exige.
   */
  tutor_phone?: string;
  vaccines!: VaccineRecordResponseDto[];
  dewormings!: DewormingRecordResponseDto[];
  medications!: MedicationRecordResponseDto[];
  issued_at!: Date;
}
