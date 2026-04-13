export class MedicationRecordResponseDto {
  id!: string;
  pet_id!: string;
  medication_name!: string;
  dosage!: string;
  frequency!: string;
  start_date!: string;
  end_date?: string;
  notes?: string;
  created_at!: Date;
  updated_at!: Date;
}
