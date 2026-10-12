/** Tipo de ação registrada na trilha de auditoria clínica (api#117). */
export enum AcaoClinicaTipo {
  CRIACAO = 'CRIACAO',
  EDICAO = 'EDICAO',
  EXCLUSAO = 'EXCLUSAO',
  /** Comprovante anexado ao registro (vacina, vermífugo ou medicação). */
  ANEXO_ADICIONADO = 'ANEXO_ADICIONADO',
  /** Comprovante removido da visualização; o arquivo permanece guardado. */
  ANEXO_REMOVIDO = 'ANEXO_REMOVIDO',
  /** Veterinário atestou que conferiu o comprovante. */
  ANEXO_VERIFICADO = 'ANEXO_VERIFICADO',
}

/** Que registro clínico a ação afetou. */
export enum EntidadeClinica {
  NOTA_CLINICA = 'NOTA_CLINICA',
  VACINA = 'VACINA',
  VERMIFUGO = 'VERMIFUGO',
  MEDICACAO = 'MEDICACAO',
}
