/**
 * Por que o CRMV foi recusado, quando há um motivo que o cliente trata à
 * parte (AUD WEB-17). Código estável: a `situacao` é texto para exibir e pode
 * mudar de redação.
 */
export enum CrmvMotivoRecusa {
  /** Registro regular, mas em nome de outra pessoa. */
  NOME_DIVERGENTE = 'NOME_DIVERGENTE',
}
