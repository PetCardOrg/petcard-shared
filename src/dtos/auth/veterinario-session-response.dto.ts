import { Role } from '../../enums/role.enum';

export class VeterinarioSessionUserDto {
  id!: string;
  nome!: string;
  email!: string;
  crmv!: string;
  telefone?: string | null;
  foto_url?: string;
  role!: Role;
}

export class VeterinarioSessionResponseDto {
  access_token!: string;
  user!: VeterinarioSessionUserDto;
}

export class VeterinarioRegisterResponseDto extends VeterinarioSessionResponseDto {
  /** Se a consulta ao CFMV durante o cadastro já liberou o acesso clínico. */
  crmv_verificado!: boolean;
}
