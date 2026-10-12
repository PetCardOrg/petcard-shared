import { EntidadeClinica } from '../../enums/acao-clinica.enum';
import { Role } from '../../enums/role.enum';

/**
 * Metadados de um comprovante anexado a um registro clínico.
 *
 * Não traz URL: o arquivo é privado e só sai por link temporário
 * (`GET /anexos/:id/arquivo`), gerado a cada abertura.
 */
export class AnexoResponseDto {
  id!: string;
  pet_id!: string;
  entidade!: EntidadeClinica;
  entidade_id!: string;
  nome_arquivo!: string;
  mime_type!: string;
  tamanho_bytes!: number;
  enviado_por_tipo!: Role;
  enviado_por_id!: string;
  enviado_por_nome!: string;
  /** Um veterinário com CRMV verificado atestou que conferiu o comprovante. */
  verificado!: boolean;
  verificado_em?: Date;
  verificado_por_nome?: string;
  verificado_por_crmv?: string;
  created_at!: Date;
}

/** Link temporário para abrir o arquivo. */
export class AnexoArquivoResponseDto {
  url!: string;
  expira_em!: Date;
}
