import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNotaClinicaDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  diagnostico?: string;

  @IsOptional()
  @IsString()
  prescricao?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
