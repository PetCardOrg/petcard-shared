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
import { IsOptionalNaoNulo } from '../../validators/optional.validators';

/**
 * PATCH de medicação. Obrigatórios podem faltar, mas não vir `null`; os
 * anuláveis aceitam `null` para limpar o campo (AUD SH-09).
 */
export class UpdateMedicationRecordDto {
  @IsOptionalNaoNulo()
  @IsUUID()
  pet_id?: string;

  @IsOptionalNaoNulo()
  @IsString()
  @MaxLength(120)
  medication_name?: string;

  @IsOptionalNaoNulo()
  @IsString()
  @MaxLength(60)
  @HasDosageQuantity()
  dosage?: string;

  @IsOptionalNaoNulo()
  @IsString()
  @MaxLength(60)
  frequency?: string;

  @IsOptionalNaoNulo()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  @IsOnOrAfterDate('start_date')
  end_date?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  veterinarian_name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string | null;
}
