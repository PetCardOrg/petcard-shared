/** Resposta de `GET /auth/veterinario/crmv` (cadastro com CRMV primeiro). */
export class CrmvConsultaResponseDto {
  /** CRMV no formato canônico ("CRMV-SP 12345"), para o cadastro gravar. */
  crmv!: string;
  uf!: string;
  numero!: string;
  /** Registro encontrado e em situação regular. */
  valido!: boolean;
  /** Nome no cadastro do CFMV, para pré-preencher o formulário (editável). */
  nome?: string;
  situacao?: string;
}
