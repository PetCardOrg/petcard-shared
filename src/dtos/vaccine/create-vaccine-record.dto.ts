import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVaccineRecordDto {
  @IsUUID()
  pet_id!: string;

  @IsString()
  vaccine_name!: string;

  @IsDateString()
  applied_at!: string;

  @IsOptional()
  @IsDateString()
  next_dose_at?: string;

  @IsOptional()
  @IsString()
  veterinarian_name?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
