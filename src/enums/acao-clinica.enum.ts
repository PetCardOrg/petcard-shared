/** Tipo de ação registrada na trilha de auditoria clínica (api#117). */
export enum AcaoClinicaTipo {
  CRIACAO = 'CRIACAO',
  EDICAO = 'EDICAO',
  EXCLUSAO = 'EXCLUSAO',
}

/** Que registro clínico a ação afetou. */
export enum EntidadeClinica {
  NOTA_CLINICA = 'NOTA_CLINICA',
  VACINA = 'VACINA',
  VERMIFUGO = 'VERMIFUGO',
  MEDICACAO = 'MEDICACAO',
}
