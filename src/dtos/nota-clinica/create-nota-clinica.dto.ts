import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNotaClinicaDto {
  @IsString()
  @MinLength(3)
  diagnostico!: string;

  @IsOptional()
  @IsString()
  prescricao?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsString()
  google_place_id?: string;
}
