import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { NormalizeEmail } from '../../validators/normalize-email.validator';
import {
  IsStrongPassword,
  PASSWORD_MAX_LENGTH,
} from '../../validators/strong-password.validator';

export class UpdateVeterinarioDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome?: string;

  @IsOptional()
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  /** Mesma regra do cadastro — trocar a senha não pode enfraquecê-la. */
  @IsOptional()
  @IsStrongPassword()
  password?: string;

  /**
   * Senha atual, exigida sempre que `password` vem no corpo.
   *
   * O token do veterinário vale 7 dias e a web o guarda em `localStorage`.
   * Sem esta prova, um token vazado bastava para trocar a senha — e a conta
   * que dá acesso a dado clínico passava definitivamente para quem o roubou.
   * Não tem regra de senha forte: é a senha que já existe, seja ela qual for.
   */
  @ValidateIf((dto: UpdateVeterinarioDto) => dto.password !== undefined)
  @IsString()
  @MaxLength(PASSWORD_MAX_LENGTH)
  senha_atual?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  crmv?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefone?: string;

  /** URL da foto de perfil, devolvida pelo upload de imagem. */
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  foto_url?: string;
}
