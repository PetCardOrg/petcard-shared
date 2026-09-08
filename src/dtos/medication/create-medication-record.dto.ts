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

export class CreateMedicationRecordDto {
  @IsUUID()
  pet_id!: string;

  @IsString()
  @MaxLength(120)
  medication_name!: string;

  @IsString()
  @MaxLength(60)
  @HasDosageQuantity()
  dosage!: string;

  @IsString()
  @MaxLength(60)
  frequency!: string;

  @IsDateString()
  start_date!: string;

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
