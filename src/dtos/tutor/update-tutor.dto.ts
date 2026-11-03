import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { NormalizeEmail } from '../../validators/normalize-email.validator';
import { PASSWORD_MAX_LENGTH } from '../../validators/strong-password.validator';

export class UpdateTutorDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @NormalizeEmail()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  profile_image_url?: string;

  /**
   * Prova de que é o dono da conta, exigida quando `email` vem no corpo:
   * com o e-mail trocado, o "esqueci a senha" vai para quem estiver com o
   * token. Conta com senha manda `senha_atual`; conta só-Google manda
   * `google_id_token`. A API decide qual dos dois vale para a conta.
   */
  @ValidateIf(
    (dto: UpdateTutorDto) =>
      dto.email !== undefined && dto.google_id_token === undefined,
  )
  @IsString()
  @MaxLength(PASSWORD_MAX_LENGTH)
  senha_atual?: string;

  /**
   * `id_token` do Google obtido na hora (o app reabre o login Google), para
   * conta sem senha. A API exige que seja recente e do mesmo `sub` da conta.
   */
  @IsOptional()
  @IsString()
  @MaxLength(4096)
  google_id_token?: string;
}
