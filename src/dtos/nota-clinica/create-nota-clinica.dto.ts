import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNotaClinicaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  diagnostico!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  prescricao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacoes?: string;

  @IsOptional()
  @IsString()
  google_place_id?: string;
}
