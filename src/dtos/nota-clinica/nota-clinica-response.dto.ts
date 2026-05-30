export class NotaClinicaResponseDto {
  id!: string;
  pet_id!: string;
  veterinario_id!: string;
  veterinario_nome!: string;
  veterinario_crmv!: string;
  google_place_id?: string;
  diagnostico!: string;
  prescricao?: string;
  observacoes?: string;
  created_at!: Date;
  updated_at!: Date;
}
