import { CrmvMotivoRecusa } from '../../enums/crmv-motivo-recusa.enum';

/**
 * Resposta de `GET /veterinarios/me/crmv` e `POST /veterinarios/me/crmv/verificar`.
 */
export class CrmvStatusResponseDto {
  verified!: boolean;
  /** Situação na base externa, para exibir como veio. */
  situacao?: string;
  /**
   * Motivo da recusa, quando é um que o cliente trata à parte (AUD WEB-17).
   * Use este campo para decidir, e não o texto da `situacao`.
   */
  motivo?: CrmvMotivoRecusa;
  verified_at?: Date;
}
