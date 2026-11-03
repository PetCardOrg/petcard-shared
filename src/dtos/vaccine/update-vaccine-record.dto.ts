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
import { IsOptionalNaoNulo } from '../../validators/optional.validators';

/**
 * PATCH de vacina. Obrigatórios podem faltar, mas não vir `null`; os
 * anuláveis aceitam `null` para limpar o campo (AUD SH-09).
 */
export class UpdateVaccineRecordDto {
  @IsOptionalNaoNulo()
  @IsUUID()
  pet_id?: string;

  @IsOptionalNaoNulo()
  @IsString()
  @MaxLength(120)
  vaccine_name?: string;

  @IsOptionalNaoNulo()
  @IsDateString()
  @IsNotFutureDate()
  applied_at?: string;

  @IsOptional()
  @IsDateString()
  @IsAfterDate('applied_at')
  next_dose_at?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  veterinarian_name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string | null;
}
