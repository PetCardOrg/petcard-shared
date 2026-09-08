import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  IsAfterDate,
  IsNotFutureDate,
} from '../../validators/clinical-date.validators';

export class UpdateVaccineRecordDto {
  @IsOptional()
  @IsUUID()
  pet_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  vaccine_name?: string;

  @IsOptional()
  @IsDateString()
  @IsNotFutureDate()
  applied_at?: string;

  @IsOptional()
  @IsDateString()
  @IsAfterDate('applied_at')
  next_dose_at?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  veterinarian_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
