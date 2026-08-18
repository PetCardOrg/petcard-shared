import { EntidadeClinica } from '../../enums/acao-clinica.enum';
import { AcaoClinicaResponseDto } from './acao-clinica-response.dto';

/**
 * Um registro clínico na linha do tempo do pet (api#117).
 *
 * Registros excluídos continuam na lista, marcados por `excluido` — o
 * histórico existe justamente para mostrar o que foi orientado, mesmo quando
 * o tutor apagou da própria visualização.
 */
export class HistoricoClinicoItemResponseDto {
  entidade!: EntidadeClinica;
  entidade_id!: string;
  /** Nome da vacina, do produto, do medicamento ou o diagnóstico da nota. */
  titulo!: string;
  /** Prescrição, dosagem ou observação, conforme a entidade. */
  descricao?: string;
  /** Data clínica do fato (aplicação, início do tratamento, consulta). */
  ocorrido_em!: Date;
  /** Quando entrou no sistema. */
  registrado_em!: Date;
  excluido!: boolean;
  excluido_em?: Date;
  veterinario_id?: string;
  veterinario_nome?: string;
  veterinario_crmv?: string;
  acoes!: AcaoClinicaResponseDto[];
}

export class HistoricoClinicoResponseDto {
  pet_id!: string;
  pet_nome!: string;
  itens!: HistoricoClinicoItemResponseDto[];
}
