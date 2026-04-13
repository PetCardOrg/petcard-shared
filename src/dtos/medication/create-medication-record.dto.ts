import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMedicationRecordDto {
  @IsUUID()
  pet_id!: string;

  @IsString()
  medication_name!: string;

  @IsString()
  dosage!: string;

  @IsString()
  frequency!: string;

  @IsDateString()
  start_date!: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
