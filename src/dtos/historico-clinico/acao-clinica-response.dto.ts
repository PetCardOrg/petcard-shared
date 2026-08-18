import { AcaoClinicaTipo } from '../../enums/acao-clinica.enum';
import { Role } from '../../enums/role.enum';

/**
 * Uma ação registrada sobre um registro clínico.
 *
 * Nome e CRMV do autor vêm gravados na própria trilha, não da conta: a
 * evidência precisa sobreviver à exclusão do veterinário.
 */
export class AcaoClinicaResponseDto {
  id!: string;
  tipo!: AcaoClinicaTipo;
  autor_tipo!: Role;
  autor_id!: string;
  autor_nome!: string;
  autor_crmv?: string;
  ocorrido_em!: Date;
}
