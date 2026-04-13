export class DewormingRecordResponseDto {
  id!: string;
  pet_id!: string;
  product_name!: string;
  applied_at!: string;
  next_dose_at?: string;
  veterinarian_name?: string;
  notes?: string;
  created_at!: Date;
  updated_at!: Date;
}
