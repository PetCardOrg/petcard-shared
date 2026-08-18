export class DewormingRecordResponseDto {
  id!: string;
  pet_id!: string;
  product_name!: string;
  applied_at!: string;
  next_dose_at?: string;
  veterinarian_name?: string;
  /** Veterinário do PetCard que fez o registro; ausente quando foi o tutor. */
  veterinario_id?: string;
  /** CRMV de quem registrou, quando é um veterinário do PetCard. */
  veterinario_crmv?: string;
  notes?: string;
  created_at!: Date;
  updated_at!: Date;
}
