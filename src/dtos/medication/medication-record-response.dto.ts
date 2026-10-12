import { AnexoResponseDto } from '../anexo/anexo-response.dto';

export class MedicationRecordResponseDto {
  id!: string;
  pet_id!: string;
  medication_name!: string;
  dosage!: string;
  frequency!: string;
  /** Veterinário do PetCard que fez o registro; ausente quando foi o tutor. */
  veterinario_id?: string;
  /** CRMV de quem registrou, quando é um veterinário do PetCard. */
  veterinario_crmv?: string;
  /** Nome de quem prescreveu; texto livre quando é profissional de fora. */
  veterinarian_name?: string;
  start_date!: string;
  end_date?: string;
  notes?: string;
  /**
   * Comprovantes anexados, do mais antigo ao mais recente. Ausente na carteira
   * pública (QR): comprovante é dado de saúde e exige login.
   */
  anexos?: AnexoResponseDto[];
  created_at!: Date;
  updated_at!: Date;
}
