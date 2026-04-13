import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDewormingRecordDto {
  @IsOptional()
  @IsUUID()
  pet_id?: string;

  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsDateString()
  applied_at?: string;

  @IsOptional()
  @IsDateString()
  next_dose_at?: string;

  @IsOptional()
  @IsString()
  veterinarian_name?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
