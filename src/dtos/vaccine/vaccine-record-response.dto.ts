export class VaccineRecordResponseDto {
  id!: string;
  pet_id!: string;
  vaccine_name!: string;
  applied_at!: string;
  next_dose_at?: string;
  veterinarian_name?: string;
  /** Veterinário do PetCard que fez o registro; ausente quando foi o tutor. */
  veterinario_id?: string;
  notes?: string;
  created_at!: Date;
  updated_at!: Date;
}
