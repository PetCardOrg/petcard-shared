import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateNotaClinicaDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  diagnostico?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  prescricao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacoes?: string;
}
