export class VaccineRecordResponseDto {
  id!: string;
  pet_id!: string;
  vaccine_name!: string;
  applied_at!: string;
  next_dose_at?: string;
  veterinarian_name?: string;
  notes?: string;
  created_at!: Date;
  updated_at!: Date;
}
