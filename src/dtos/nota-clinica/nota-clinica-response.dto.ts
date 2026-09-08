export class NotaClinicaResponseDto {
  id!: string;
  pet_id!: string;
  /**
   * Veterinário do PetCard que assinou a nota. Ausente quando a conta dele
   * foi excluída depois (ADR-009): a nota permanece, mas deixa de ter autor
   * ativo — e é essa ausência que a UI usa para não oferecer edição.
   */
  veterinario_id?: string;
  /** Gravados na criação da nota, não derivados da conta — sobrevivem a ela. */
  veterinario_nome!: string;
  veterinario_crmv!: string;
  google_place_id?: string;
  diagnostico!: string;
  prescricao?: string;
  observacoes?: string;
  created_at!: Date;
  updated_at!: Date;
}
