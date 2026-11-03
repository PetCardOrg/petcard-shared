import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsOptionalNaoNulo } from '../../validators/optional.validators';

/**
 * PATCH da nota clínica. O diagnóstico pode faltar, mas não vir `null`; a
 * prescrição e as observações aceitam `null` para limpar (AUD SH-09).
 */
export class UpdateNotaClinicaDto {
  @IsOptionalNaoNulo()
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  diagnostico?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  prescricao?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacoes?: string | null;
}
