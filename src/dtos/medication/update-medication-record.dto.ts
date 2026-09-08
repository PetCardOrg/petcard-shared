import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  HasDosageQuantity,
  IsOnOrAfterDate,
} from '../../validators/clinical-date.validators';

export class UpdateMedicationRecordDto {
  @IsOptional()
  @IsUUID()
  pet_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  medication_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  @HasDosageQuantity()
  dosage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  frequency?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  @IsOnOrAfterDate('start_date')
  end_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  veterinarian_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
